export interface SubscriptionOption {
  id: string;
  name: string;
  description: string;
  durations: {
    months: number;
    price: number;
  }[];
}

export interface CustomSubscription {
  name: string;
  description: string;
  duration: number;
  price: number;
}