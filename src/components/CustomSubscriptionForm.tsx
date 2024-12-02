import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Plus } from 'lucide-react';

interface CustomSubscriptionFormProps {
  onClose: () => void;
}

export function CustomSubscriptionForm({ onClose }: CustomSubscriptionFormProps) {
  const { addItem } = useCart();
  const [form, setForm] = useState({
    name: '',
    description: '',
    duration: 1,
    price: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addItem({
      serviceId: 'custom',
      duration: form.duration,
      customPrice: form.price,
      description: `${form.name} - ${form.description}`
    });

    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-green-600">Create Custom Subscription</h3>
        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
          <Plus className="h-6 w-6 text-green-600" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subscription Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., Premium Gaming Package"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={3}
            placeholder="Describe your custom subscription..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (months)
            </label>
            <input
              type="number"
              required
              min="1"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (ETB)
            </label>
            <input
              type="number"
              required
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Custom Subscription
          </button>
        </div>
      </form>
    </div>
  );
}