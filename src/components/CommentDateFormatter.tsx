'use client';

interface CommentDateFormatterProps {
  date: string;
}

function formatCommentDate(date: string) {
  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return date;
    }

    return dateObj.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return date;
  }
}

export function CommentDateFormatter({ date }: CommentDateFormatterProps) {
  return <>{formatCommentDate(date)}</>;
}
