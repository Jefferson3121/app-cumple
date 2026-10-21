import { useEffect, useState } from 'react';

export default function usePhotoRotation(photoCount, interval) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (photoCount <= 1) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % photoCount);
    }, interval);

    return () => window.clearInterval(timerId);
  }, [interval, photoCount]);

  return activeIndex;
}
