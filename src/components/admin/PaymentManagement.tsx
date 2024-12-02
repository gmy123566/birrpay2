import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Check, X, Trash2 } from 'lucide-react';
import { SearchFilter } from './SearchFilter';
import { addUserFromPayment } from '../../services/userService';

interface Payment {
  id: number;
  user: string;
  email: string;
  service: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  paymentProof: string;
}

export function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Pending' | 'Approved' | 'Rejected'>('all');

  useEffect(() => {
    // Load subscriptions from localStorage
    const storedSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    setPayments(storedSubscriptions);
  }, []);
  
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleFilter = () => {
    setFilterStatus(current => {
      if (current === 'all') return 'Pending';
      if (current === 'Pending') return 'Approved';
      if (current === 'Approved') return 'Rejected';
      return 'all';
    });
  };

  const handleProcess = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  const handleApprove = () => {
    if (selectedPayment) {
      // Update payment status
      const updatedPayments = payments.map(p => 
        p.id === selectedPayment.id ? { ...p, status: 'Approved' as const } : p
      );
      setPayments(updatedPayments);
      localStorage.setItem('subscriptions', JSON.stringify(updatedPayments));

      // Add or update user
      addUserFromPayment({
        user: selectedPayment.user,
        email: selectedPayment.email,
        service: selectedPayment.service
      });

      setSelectedPayment(null);
      alert('Payment approved and user account updated successfully!');
    }
  };

  const handleReject = () => {
    if (selectedPayment) {
      const updatedPayments = payments.map(p => 
        p.id === selectedPayment.id ? { ...p, status: 'Rejected' as const } : p
      );
      setPayments(updatedPayments);
      localStorage.setItem('subscriptions', JSON.stringify(updatedPayments));
      setSelectedPayment(null);
      alert('Payment rejected.');
    }
  };

  const handleDelete = (paymentId: number) => {
    const updatedPayments = payments.filter(p => p.id !== paymentId);
    setPayments(updatedPayments);
    localStorage.setItem('subscriptions', JSON.stringify(updatedPayments));
    alert('Payment deleted successfully.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Payment Management</h2>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      <SearchFilter
        searchPlaceholder="Search payments..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={toggleFilter}
      />

      {filterStatus !== 'all' && (
        <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          Status: {filterStatus}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{payment.user}</div>
                  <div className="text-sm text-gray-500">{payment.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{payment.service}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{payment.amount} ETB</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{payment.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payment.status === 'Approved' 
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'Rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleProcess(payment)}
                      className="text-green-600 hover:text-green-900"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleDelete(payment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Verification Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-bold mb-4">Verify Payment</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">User</p>
                <p className="font-medium">{selectedPayment.user}</p>
                <p className="text-sm text-gray-500">{selectedPayment.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-medium">{selectedPayment.amount} ETB</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Screenshot</p>
                <img 
                  src={selectedPayment.paymentProof} 
                  alt="Payment Proof" 
                  className="mt-2 rounded-lg border border-gray-200 max-h-96 object-contain w-full"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}