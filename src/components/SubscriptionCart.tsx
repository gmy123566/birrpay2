import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useSubscriptionPrices } from '../hooks/useSubscriptionPrices';

interface Props {
  email: string;
  username: string;
  onCheckout: () => void;
}

export function SubscriptionCart({ email, username, onCheckout }: Props) {
  const { items, removeItem } = useCart();
  const services = useSubscriptionPrices();

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const service = services.find(s => s.id === item.serviceId);
      if (!service) return total;
      
      if (item.customPrice) {
        return total + item.customPrice;
      }
      
      const duration = service.durations.find(d => d.months === item.duration);
      return total + (duration?.price || 0);
    }, 0);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6 border-t-4 border-orange-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center text-gray-800">
          <ShoppingCart className="h-5 w-5 mr-2 text-orange-500" />
          Your Subscription Cart
        </h3>
        <span className="text-sm text-gray-600">{items.length} item(s)</span>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item, index) => {
          const service = services.find(s => s.id === item.serviceId);
          if (!service) return null;

          return (
            <div key={index} className="py-4 flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{service.name}</h4>
                <p className="text-sm text-gray-600">Duration: {item.duration} Month(s)</p>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-green-600">
                  {item.customPrice ? `${item.customPrice} ETB` : 
                    `${service.durations.find(d => d.months === item.duration)?.price || 0} ETB`}
                </span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-800">Total Amount</span>
          <span className="font-bold text-green-600 text-lg">{calculateTotal()} ETB</span>
        </div>

        <button
          onClick={onCheckout}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}