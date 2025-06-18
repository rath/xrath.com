'use client';

import { useEffect, useState } from 'react';

interface CommentDateFormatterProps {
  date: string;
}

export function CommentDateFormatter({ date }: CommentDateFormatterProps) {
  const [formattedDate, setFormattedDate] = useState(date);

  useEffect(() => {
    try {
      const dateObj = new Date(date);
      
      if (isNaN(dateObj.getTime())) {
        return;
      }
      
      // Format to browser's local timezone
      const formatted = dateObj.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      setFormattedDate(formatted);
    } catch (error) {
      // Keep original date if formatting fails
    }
  }, [date]);

  return <>{formattedDate}</>;
}