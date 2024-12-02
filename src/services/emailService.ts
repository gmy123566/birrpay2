import { addDoc, collection, query, where, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Reply {
  id: string;
  to: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'failed';
  messageId: string;
}

export async function sendReplyEmail(to: string, content: string, messageId: string) {
  try {
    // Store the reply in Firestore
    const replyRef = await addDoc(collection(db, 'replies'), {
      to,
      content,
      messageId,
      timestamp: serverTimestamp(),
      status: 'sent',
      sentAt: new Date().toISOString()
    });

    // In a real production environment, you would:
    // 1. Use a Cloud Function to handle email sending
    // 2. Set up email service (SendGrid, AWS SES, etc.)
    // 3. Handle email delivery status updates
    
    // For demo purposes, we'll simulate a successful delivery
    await new Promise(resolve => setTimeout(resolve, 1000));

    return replyRef.id;
  } catch (error) {
    console.error('Error sending reply:', error);
    
    // Store failed attempt
    await addDoc(collection(db, 'replies'), {
      to,
      content,
      messageId,
      timestamp: serverTimestamp(),
      status: 'failed',
      error: error.message
    });

    throw new Error('Failed to send reply');
  }
}

export async function getRepliesForMessage(messageId: string): Promise<Reply[]> {
  try {
    const repliesRef = collection(db, 'replies');
    const q = query(
      repliesRef, 
      where('messageId', '==', messageId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date(),
    })) as Reply[];
  } catch (error) {
    console.error('Error getting replies:', error);
    throw new Error('Failed to get replies');
  }
}