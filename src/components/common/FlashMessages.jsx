import { useEffect, useState } from 'react';

export default function FlashMessages({ messages, error }) {
  const [visibleMessages, setVisibleMessages] = useState(messages);

  useEffect(() => {
    setVisibleMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (!visibleMessages.length) return undefined;
    const timer = window.setTimeout(() => setVisibleMessages([]), 5000);
    return () => window.clearTimeout(timer);
  }, [visibleMessages]);

  const items = error ? [['error', error], ...visibleMessages] : visibleMessages;

  return (
    <div className="flash-messages" aria-live="polite">
      {items.map(([category, message], index) => (
        <div
          className={`flash-message flash-${category}`}
          key={`${category}-${message}-${index}`}
        >
          {message}
        </div>
      ))}
    </div>
  );
}
