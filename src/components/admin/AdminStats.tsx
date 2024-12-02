import React from 'react';
import { Users, CreditCard, TrendingUp, Calendar } from 'lucide-react';

export function AdminStats() {
  const stats = [
    {
      label: 'Total Users',
      value: '1,234',
      icon: Users,
      change: '+12%',
      color: 'bg-blue-500',
    },
    {
      label: 'Active Subscriptions',
      value: '892',
      icon: Calendar,
      change: '+8%',
      color: 'bg-green-500',
    },
    {
      label: 'Monthly Revenue',
      value: '156,789 ETB',
      icon: TrendingUp,
      change: '+23%',
      color: 'bg-orange-500',
    },
    {
      label: 'Pending Payments',
      value: '23',
      icon: CreditCard,
      change: '-5%',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className={`text-sm font-semibold ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Add charts and graphs here */}
    </div>
  );
}