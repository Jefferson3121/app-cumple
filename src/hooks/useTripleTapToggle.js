import { useCallback, useRef, useState } from 'react';

const MAX_TAP_INTERVAL = 400;

export default function useTripleTapToggle(initialValue = true) {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const tapState = useRef({ count: 0, lastTimestamp: 0 });

  const handlePointerUp = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    if (event.target instanceof Element && event.target.closest('.countdown-unit')) {
      tapState.current = { count: 0, lastTimestamp: 0 };
      return;
    }

    const timestamp = performance.now();
    const isWithinInterval =
      timestamp - tapState.current.lastTimestamp <= MAX_TAP_INTERVAL;
    const count = isWithinInterval ? tapState.current.count + 1 : 1;

    if (count === 3) {
      setIsEnabled((currentValue) => !currentValue);
      tapState.current = { count: 0, lastTimestamp: 0 };
      return;
    }

    tapState.current = { count, lastTimestamp: timestamp };
  }, []);

  return [isEnabled, handlePointerUp];
}
