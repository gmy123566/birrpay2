import { useState, useEffect } from 'react';
import { onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  pendingTransactions: number;
  loading: boolean;
  error: string | null;
}

export function useAdminStats(refreshInterval = 5 * 60 * 1000) { // 5 minutes default
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    pendingTransactions: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = () => {
      try {
        // Users count
        const usersUnsubscribe = onSnapshot(
          collection(db, 'users'),
          (snapshot) => {
            setStats(prev => ({ ...prev, totalUsers: snapshot.size }));
          },
          (error) => {
            setStats(prev => ({ ...prev, error: error.message }));
          }
        );

        // Active subscriptions - simplified query
        const subscriptionsUnsubscribe = onSnapshot(
          query(collection(db, 'subscriptions'), where('status', '==', 'Approved')),
          (snapshot) => {
            const now = new Date();
            const activeCount = snapshot.docs.filter(doc => {
              const endDate = doc.data().endDate?.toDate();
              return endDate && endDate > now;
            }).length;
            setStats(prev => ({ ...prev, activeSubscriptions: activeCount }));
          }
        );

        // Monthly revenue - simplified query
        const paymentsUnsubscribe = onSnapshot(
          query(collection(db, 'payments'), where('status', '==', 'Approved')),
          (snapshot) => {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const monthlyTotal = snapshot.docs.reduce((sum, doc) => {
              const timestamp = doc.data().timestamp?.toDate();
              if (timestamp && timestamp >= startOfMonth) {
                return sum + (doc.data().amount || 0);
              }
              return sum;
            }, 0);
            setStats(prev => ({ ...prev, monthlyRevenue: monthlyTotal }));
          }
        );

        // Pending transactions
        const pendingUnsubscribe = onSnapshot(
          query(collection(db, 'payments'), where('status', '==', 'Pending')),
          (snapshot) => {
            setStats(prev => ({
              ...prev,
              pendingTransactions: snapshot.size,
              loading: false
            }));
          }
        );

        return () => {
          usersUnsubscribe();
          subscriptionsUnsubscribe();
          paymentsUnsubscribe();
          pendingUnsubscribe();
        };
      } catch (error: any) {
        setStats(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return stats;
}