import React, { useState } from 'react';
import { SearchFilter } from './SearchFilter';

interface Subscription {
  id: number;
  user: string;
  service: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Pending';
}

export function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 1,
      user: 'John Doe',
      service: 'Netflix',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      status: 'Active',
    },
    {
      id: 2,
      user: 'Jane Smith',
      service: 'Spotify',
      startDate: '2024-02-15',
      endDate: '2024-05-15',
      status: 'Active',
    },
    {
      id: 3,
      user: 'Bob Johnson',
      service: 'Netflix',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      status: 'Expired',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Expired' | 'Pending'>('all');

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = 
      subscription.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || subscription.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleFilter = () => {
    setFilterStatus(current => {
      if (current === 'all') return 'Active';
      if (current === 'Active') return 'Expired';
      if (current === 'Expired') return 'Pending';
      return 'all';
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Subscription Management</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Add Subscription
        </button>
      </div>

      <SearchFilter
        searchPlaceholder="Search subscriptions..."
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
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
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
            {filteredSubscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{subscription.user}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{subscription.service}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{subscription.startDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{subscription.endDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    subscription.status === 'Active' 
                      ? 'bg-green-100 text-green-800'
                      : subscription.status === 'Expired'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {subscription.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                  <button 
                    onClick={() => setSubscriptions(subscriptions.filter(s => s.id !== subscription.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}