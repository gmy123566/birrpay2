import React, { useState } from 'react';
import { Shield, Globe, CreditCard, Wallet } from 'lucide-react';
import { NewSubscription } from './NewSubscription';
import { RenewalSubscription } from './RenewalSubscription';
import { SubscriptionForm } from './SubscriptionForm';

export function SubscriptionSelector() {
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [isRenewal, setIsRenewal] = useState(false);

  const handleNewSubscription = () => {
    setIsRenewal(false);
    setShowSubscriptionForm(true);
  };

  const handleRenewal = () => {
    setIsRenewal(true);
    setShowSubscriptionForm(true);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-50 to-orange-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23f97316' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {!showSubscriptionForm ? (
          <div className="grid md:grid-cols-2 gap-8">
            <NewSubscription onSelect={handleNewSubscription} />
            <RenewalSubscription onSelect={handleRenewal} />
          </div>
        ) : (
          <SubscriptionForm 
            isRenewal={isRenewal}
            onBack={() => setShowSubscriptionForm(false)}
          />
        )}

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
            <Shield className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-sm text-gray-600">SSL Protected</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
            <Globe className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-sm text-gray-600">International Payments</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
            <CreditCard className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-sm text-gray-600">CBE Verified</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
            <Wallet className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-sm text-gray-600">TeleBirr Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}