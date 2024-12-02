import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onSelect: () => void;
}

export function NewSubscription({ onSelect }: Props) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
          <Plus className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Start New Plan</h3>
        <p className="text-gray-600 mb-6">Choose your plan and begin your journey with our premium subscription services.</p>
        <button 
          onClick={onSelect}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Start New Plan
        </button>
      </div>
      <div className="px-8 py-4 bg-green-50 border-t border-green-100">
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
            Choose from multiple services
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
            Flexible payment options
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
            24/7 customer support
          </li>
        </ul>
      </div>
    </div>
  );
}