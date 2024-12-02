import React, { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Message } from '../../types/message';
import { formatDistanceToNow } from 'date-fns';

interface MessageNotificationProps {
  message: Message;
  onDismiss: (id: string) => void;
}

export function MessageNotification({ message, onDismiss }: MessageNotificationProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(message.id);
    }, 300); // Match animation duration
  };

  return (
    <div 
      className={`w-96 bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 transform transition-all duration-300 ease-in-out ${
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Bell className="h-5 w-5 text-green-500" />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            New message from {message.user}
          </p>
          <p className="mt-1 text-sm text-gray-500 truncate">
            {message.content}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={handleDismiss}
            className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}