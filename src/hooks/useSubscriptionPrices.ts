import { useState, useEffect } from 'react';
import { Service, getServices, subscribeToPriceUpdates } from '../services/subscriptionService';

export function useSubscriptionPrices() {
  const [services, setServices] = useState<Service[]>(getServices());

  useEffect(() => {
    // Initial load
    setServices(getServices());

    // Subscribe to updates
    const unsubscribe = subscribeToPriceUpdates((updatedServices) => {
      setServices(updatedServices);
    });

    return unsubscribe;
  }, []);

  return services;
}