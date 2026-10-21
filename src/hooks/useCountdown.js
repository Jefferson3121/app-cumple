import { useEffect, useState } from 'react';

const initialTime = { days: 0, hours: 0, minutes: 0, seconds: 0, complete: false };

function getTimeRemaining(targetDate) {
  const distance = Math.max(0, targetDate.getTime() - Date.now());
  const totalSeconds = Math.floor(distance / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    complete: distance === 0,
  };
}

export default function useCountdown(targetDate) {
  const [time, setTime] = useState(() => getTimeRemaining(targetDate));

  useEffect(() => {
    setTime(getTimeRemaining(targetDate));
    const timerId = window.setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [targetDate]);

  return time ?? initialTime;
}
