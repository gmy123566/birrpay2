import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { User } from '../types/user';

export async function addUserFromPayment(payment: {
  user: string;
  email: string;
  service: string;
}): Promise<User> {
  try {
    // Check if user already exists
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', payment.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Update existing user
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as User;
      const updatedUser = {
        ...userData,
        subscriptions: userData.subscriptions + 1
      };
      await setDoc(doc(db, 'users', userDoc.id), updatedUser);
      return updatedUser;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: payment.user,
      email: payment.email,
      status: 'Active',
      subscriptions: 1,
      role: 'user'
    };

    await setDoc(doc(db, 'users', newUser.id), newUser);
    return newUser;
  } catch (error) {
    console.error('Error adding/updating user:', error);
    throw error;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as User[];
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}