import React from 'react';
import { CreditCard, Calendar, DollarSign, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function UserProfile() {
  const { user } = useAuth();
  const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
  const userSubscriptions = subscriptions.filter((sub: any) => 
    sub.email === user?.email && sub.status === 'Approved'
  );

  const calculateExpenses = () => {
    const monthly = userSubscriptions.reduce((total: number, sub: any) => total + (sub.amount / (sub.duration || 1)), 0);
    const yearly = monthly * 12;
    return { monthly, yearly };
  };

  const { monthly, yearly } = calculateExpenses();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user?.email}</h2>
          <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <CreditCard className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-green-600">Active Subscriptions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{userSubscriptions.length}</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Calendar className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="font-semibold text-orange-600">Next Renewal</h3>
          </div>
          <p className="text-sm text-gray-600">
            {userSubscriptions[0]?.endDate || 'No active subscriptions'}
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-600">Monthly Expense</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{monthly.toFixed(2)} ETB</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-purple-600">Yearly Expense</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{yearly.toFixed(2)} ETB</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Subscriptions</h3>
        <div className="space-y-4">
          {userSubscriptions.map((sub: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
              <div>
                <h4 className="font-semibold text-gray-800">{sub.service}</h4>
                <p className="text-sm text-gray-600">
                  Expires: {sub.endDate}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{sub.amount} ETB</p>
                <p className="text-sm text-gray-600">{sub.duration} months</p>
              </div>
            </div>
          ))}

          {userSubscriptions.length === 0 && (
            <p className="text-center text-gray-500 py-4">No active subscriptions</p>
          )}
        </div>
      </div>
    </div>
  );
}