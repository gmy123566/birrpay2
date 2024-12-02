import React, { useState } from 'react';
import { Users, CreditCard, Settings, BarChart, MessageCircle, Package } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { UserManagement } from './UserManagement';
import { SubscriptionManagement } from './SubscriptionManagement';
import { PaymentManagement } from './PaymentManagement';
import { DashboardStats } from './DashboardStats';
import { UserRegistrations } from './UserRegistrations';
import { MessageManagement } from './MessageManagement';
import { ServiceManagement } from './ServiceManagement';
import { NotificationContainer } from './NotificationContainer';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'subscriptions' | 'payments' | 'messages' | 'services'>('stats');

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return (
          <div className="space-y-8">
            <DashboardStats />
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Registrations</h2>
              <UserRegistrations />
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'messages':
        return <MessageManagement />;
      case 'services':
        return <ServiceManagement />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NotificationContainer />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}