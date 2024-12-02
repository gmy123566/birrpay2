import React from 'react';
import { Users, CreditCard, TrendingUp, Clock } from 'lucide-react';
import { useAdminStats } from '../../hooks/useAdminStats';

export function DashboardStats() {
  const stats = useAdminStats();

  if (stats.loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <p className="text-red-700">Error loading dashboard stats: {stats.error}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Active Subscriptions',
      value: stats.activeSubscriptions,
      icon: CreditCard,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      title: 'Monthly Revenue',
      value: `${stats.monthlyRevenue.toLocaleString()} ETB`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      trend: '+23%'
    },
    {
      title: 'Pending Transactions',
      value: stats.pendingTransactions,
      icon: Clock,
      color: 'bg-purple-500',
      trend: stats.pendingTransactions > 0 ? 'Needs Action' : 'All Clear'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <span className={`text-sm font-semibold ${
              stat.trend.includes('+') ? 'text-green-600' : 
              stat.trend === 'All Clear' ? 'text-green-600' :
              'text-orange-600'
            }`}>
              {stat.trend}
            </span>
          </div>
          <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
          <p className="text-gray-600 text-sm">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}