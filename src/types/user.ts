export interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  subscriptions: number;
  role: 'user' | 'admin';
}