import { useEffect, useState } from 'react';

export const useCurrentTime = () => {
  const [time, setTime] = useState(
    new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  );

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setTime(
        new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return time;
};
