import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Message } from '../types/message';

export async function addMessage(message: Omit<Message, 'id' | 'read'>) {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...message,
      read: false,
      timestamp: serverTimestamp(),
      date: new Date().toISOString().split('T')[0]
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
}

export async function getMessages() {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date(),
    })) as Message[];
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
}

export async function markMessageAsRead(messageId: string) {
  try {
    const messageRef = doc(db, 'messages', messageId);
    await updateDoc(messageRef, { 
      read: true,
      readAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
}

export async function deleteMessage(messageId: string) {
  try {
    await deleteDoc(doc(db, 'messages', messageId));
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

export function subscribeToMessages(callback: (messages: Message[]) => void) {
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date(),
    })) as Message[];
    callback(messages);
  }, (error) => {
    console.error('Error subscribing to messages:', error);
  });
}