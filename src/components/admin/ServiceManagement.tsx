import React, { useState } from 'react';
import { SearchFilter } from './SearchFilter';
import { Edit2, Save, X } from 'lucide-react';
import { useSubscriptionPrices } from '../../hooks/useSubscriptionPrices';
import { updateServicePrices } from '../../services/subscriptionService';
import type { ServicePrice } from '../../services/subscriptionService';

export function ServiceManagement() {
  const services = useSubscriptionPrices();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editedPrices, setEditedPrices] = useState<Record<string, ServicePrice[]>>({});

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditService = (serviceId: string) => {
    setEditingService(serviceId);
    setEditedPrices({
      ...editedPrices,
      [serviceId]: services.find(s => s.id === serviceId)?.durations || []
    });
  };

  const handlePriceChange = (serviceId: string, months: number, newPrice: string) => {
    const price = parseInt(newPrice) || 0;
    setEditedPrices({
      ...editedPrices,
      [serviceId]: editedPrices[serviceId].map(duration =>
        duration.months === months ? { ...duration, price } : duration
      )
    });
  };

  const handleSave = (serviceId: string) => {
    updateServicePrices(serviceId, editedPrices[serviceId]);
    setEditingService(null);
  };

  const handleCancel = (serviceId: string) => {
    setEditingService(null);
    delete editedPrices[serviceId];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Service Management</h2>
      </div>

      <SearchFilter
        searchPlaceholder="Search services..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => {}}
      />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                {editingService === service.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(service.id)}
                      className="p-2 text-green-600 hover:text-green-700"
                    >
                      <Save className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleCancel(service.id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditService(service.id)}
                    className="p-2 text-gray-600 hover:text-gray-700"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {(editingService === service.id ? editedPrices[service.id] : service.durations).map((duration) => (
                  <div key={duration.months} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {duration.months} Month{duration.months > 1 ? 's' : ''}
                    </span>
                    {editingService === service.id ? (
                      <input
                        type="number"
                        value={duration.price}
                        onChange={(e) => handlePriceChange(service.id, duration.months, e.target.value)}
                        className="w-24 px-2 py-1 text-right border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Price"
                      />
                    ) : (
                      <span className="font-medium">
                        {duration.price > 0 ? `${duration.price} ETB` : 'Custom Price'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}