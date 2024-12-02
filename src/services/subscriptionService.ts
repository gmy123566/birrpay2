import { subscriptionOptions } from '../data/subscriptions';

export interface ServicePrice {
  months: number;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  durations: ServicePrice[];
}

// Initialize services in localStorage if not present
export function initializeServices() {
  if (!localStorage.getItem('subscriptionServices')) {
    localStorage.setItem('subscriptionServices', JSON.stringify(subscriptionOptions));
  }
}

// Get all services
export function getServices(): Service[] {
  const services = localStorage.getItem('subscriptionServices');
  return services ? JSON.parse(services) : subscriptionOptions;
}

// Update service prices
export function updateServicePrices(serviceId: string, durations: ServicePrice[]) {
  const services = getServices();
  const updatedServices = services.map(service =>
    service.id === serviceId ? { ...service, durations } : service
  );
  localStorage.setItem('subscriptionServices', JSON.stringify(updatedServices));
  
  // Dispatch event for real-time updates
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'subscriptionServices',
    newValue: JSON.stringify(updatedServices)
  }));
  
  return updatedServices;
}

// Subscribe to price updates
export function subscribeToPriceUpdates(callback: (services: Service[]) => void) {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'subscriptionServices' && e.newValue) {
      callback(JSON.parse(e.newValue));
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}