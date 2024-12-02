import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message } from '../types/message';
import { addMessage as addMessageToDb, markMessageAsRead, deleteMessage as deleteMessageFromDb, subscribeToMessages } from '../services/messageService';

interface MessageContextType {
  messages: Message[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  addMessage: (message: Omit<Message, 'id' | 'read'>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToMessages((updatedMessages) => {
      setMessages(updatedMessages);
      const unreadMessages = updatedMessages.filter(m => !m.read);
      setUnreadCount(unreadMessages.length);
      
      // Update document title
      if (unreadMessages.length > 0) {
        document.title = `(${unreadMessages.length}) New Messages - Birr Pay Admin`;
      } else {
        document.title = 'Birr Pay Admin';
      }
      
      // Play notification sound for new messages
      if (unreadMessages.length > 0) {
        const audio = new Audio('/notification.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError('Failed to mark message as read');
      console.error(err);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await deleteMessageFromDb(id);
      const deletedMessage = messages.find(msg => msg.id === id);
      setMessages(messages.filter(msg => msg.id !== id));
      if (deletedMessage && !deletedMessage.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      setError('Failed to delete message');
      console.error(err);
    }
  };

  const addMessage = async (message: Omit<Message, 'id' | 'read'>) => {
    try {
      await addMessageToDb(message);
      setUnreadCount(prev => prev + 1);
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  return (
    <MessageContext.Provider value={{ 
      messages, 
      unreadCount, 
      markAsRead, 
      deleteMessage, 
      addMessage,
      loading,
      error
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
}