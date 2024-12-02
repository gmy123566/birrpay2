import React, { useState, useEffect } from 'react';
import { Message } from '../../types/message';
import { MessageNotification } from './MessageNotification';
import { useMessages } from '../../contexts/MessageContext';

export function NotificationContainer() {
  const { messages } = useMessages();
  const [notifications, setNotifications] = useState<Map<string, Message>>(new Map());
  const [viewedMessages, setViewedMessages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check for new unread messages that haven't been viewed yet
    const newMessages = messages.filter(
      msg => !msg.read && !viewedMessages.has(msg.id)
    );
    
    if (newMessages.length > 0) {
      const updatedNotifications = new Map(notifications);
      newMessages.forEach(msg => {
        if (!updatedNotifications.has(msg.id)) {
          updatedNotifications.set(msg.id, msg);
          // Play notification sound
          const audio = new Audio('/notification.mp3');
          audio.play().catch(e => console.log('Audio play failed:', e));
        }
      });
      setNotifications(updatedNotifications);
    }
  }, [messages, viewedMessages]);

  const handleDismiss = (id: string) => {
    const updatedNotifications = new Map(notifications);
    updatedNotifications.delete(id);
    setNotifications(updatedNotifications);
    setViewedMessages(prev => new Set(prev).add(id));
  };

  return (
    <div className="fixed z-50 right-0 top-0 p-4 space-y-4">
      {Array.from(notifications.values()).map((notification) => (
        <MessageNotification
          key={notification.id}
          message={notification}
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  );
}