import React from 'react';
import { Users, CreditCard, Settings, BarChart, LogOut, MessageCircle, Package } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMessages } from '../../contexts/MessageContext';

interface Props {
  activeTab: 'stats' | 'users' | 'subscriptions' | 'payments' | 'messages' | 'services';
  onTabChange: (tab: 'stats' | 'users' | 'subscriptions' | 'payments' | 'messages' | 'services') => void;
}

export function AdminSidebar({ activeTab, onTabChange }: Props) {
  const { logout } = useAuth();
  const { unreadCount } = useMessages();
  
  const menuItems = [
    { id: 'stats', label: 'Dashboard', icon: BarChart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'subscriptions', label: 'Subscriptions', icon: Settings },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
  ] as const;

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-green-600">Birr Pay Admin</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left relative ${
              activeTab === item.id
                ? 'bg-green-50 border-r-4 border-green-600 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className="relative">
                <item.icon className="h-5 w-5 mr-3" />
                {item.id === 'messages' && unreadCount > 0 && (
                  <div className="absolute -top-2 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {unreadCount}
                  </div>
                )}
              </div>
              <span>{item.label}</span>
            </div>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-0 w-64 p-6">
        <button 
          onClick={logout}
          className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}