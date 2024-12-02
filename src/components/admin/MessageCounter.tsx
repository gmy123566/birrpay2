import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useMessages } from '../../contexts/MessageContext';

export function MessageCounter() {
  const { unreadCount } = useMessages();

  useEffect(() => {
    // Update document title when unread count changes
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) New Messages - Birr Pay Admin`;
    } else {
      document.title = 'Birr Pay Admin';
    }
  }, [unreadCount]);

  if (unreadCount === 0) return null;

  return (
    <div className="relative inline-flex">
      <MessageCircle className="h-6 w-6 text-gray-600" />
      <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
        {unreadCount}
      </span>
    </div>
  );
}