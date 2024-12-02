import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time in 12-hour format with AM/PM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    });
  };

  return (
    <div className="flex items-center bg-orange-500 px-4 py-2 rounded-lg text-white shadow-md">
      <ClockIcon className="h-5 w-5 mr-2" />
      <div className="flex items-center space-x-1">
        <time className="text-sm font-medium whitespace-nowrap">
          {formatTime(time)}
        </time>
        <span className="text-xs font-medium bg-white/20 px-1.5 py-0.5 rounded">
          UTC
        </span>
      </div>
    </div>
  );
}