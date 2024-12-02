import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

// Messages
export async function addMessage(message: any) {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...message,
      timestamp: new Date(),
      read: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
}

export async function getMessages() {
  try {
    const querySnapshot = await getDocs(collection(db, 'messages'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
}

// Subscriptions
export async function addSubscription(subscription: any) {
  try {
    const docRef = await addDoc(collection(db, 'subscriptions'), {
      ...subscription,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding subscription:', error);
    throw error;
  }
}

// Users
export async function addUser(user: any) {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      ...user,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

// Payments
export async function addPayment(payment: any, screenshot: File) {
  try {
    // Upload screenshot to storage
    const storageRef = ref(storage, `payment-proofs/${Date.now()}-${screenshot.name}`);
    await uploadBytes(storageRef, screenshot);
    const downloadURL = await getDownloadURL(storageRef);

    // Add payment document with screenshot URL
    const docRef = await addDoc(collection(db, 'payments'), {
      ...payment,
      screenshotUrl: downloadURL,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding payment:', error);
    throw error;
  }
}

// Service Prices
export async function updateServicePrices(serviceId: string, prices: any) {
  try {
    const serviceRef = doc(db, 'services', serviceId);
    await updateDoc(serviceRef, { prices });
    return true;
  } catch (error) {
    console.error('Error updating service prices:', error);
    throw error;
  }
}

// Generic update and delete functions
export async function updateDocument(collection: string, id: string, data: any) {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

export async function deleteDocument(collection: string, id: string) {
  try {
    await deleteDoc(doc(db, collection, id));
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}