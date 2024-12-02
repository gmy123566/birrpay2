export interface Message {
  id: string;
  user: string;
  email: string;
  content: string;
  timestamp: Date;
  read: boolean;
  date?: string;
}