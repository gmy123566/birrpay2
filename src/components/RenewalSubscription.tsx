import React from 'react';
import { RefreshCw } from 'lucide-react';

interface Props {
  onSelect: () => void;
}

export function RenewalSubscription({ onSelect }: Props) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
          <RefreshCw className="h-8 w-8 text-orange-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Renew Existing Plan</h3>
        <p className="text-gray-600 mb-6">Extend your current subscription and continue enjoying uninterrupted services.</p>
        <button 
          onClick={onSelect}
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Renew Existing Plan
        </button>
      </div>
      <div className="px-8 py-4 bg-orange-50 border-t border-orange-100">
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Quick renewal process
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Special renewal discounts
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Maintain your preferences
          </li>
        </ul>
      </div>
    </div>
  );
}