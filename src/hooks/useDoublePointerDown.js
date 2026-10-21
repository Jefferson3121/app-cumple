import { useRef, useCallback, useEffect } from 'react';

/**
 * Custom React hook for detecting double pointer-down (tap) events
 * Supports both mouse and touch input with debouncing to prevent false triggers
 *
 * @param {Object} options - Configuration options
 * @param {number} options.debounceDelay - Milliseconds between taps to count as double-tap (default: 300)
 * @param {Function} options.onDoubleTap - Callback function when double-tap detected
 * @param {boolean} options.enabled - Whether gesture detection is enabled (default: true)
 * @returns {Object} { ref, isListening, reset, tapCount, lastTapTime }
 */
export const useDoublePointerDown = ({
  debounceDelay = 300,
  onDoubleTap = () => {},
  enabled = true,
} = {}) => {
  const ref = useRef(null);
  const tapCountRef = useRef(0);
  const lastTapTimeRef = useRef(0);
  const debounceTimerRef = useRef(null);
  const isListeningRef = useRef(false);

  const reset = useCallback(() => {
    tapCountRef.current = 0;
    lastTapTimeRef.current = 0;
  }, []);

  const handlePointerDown = useCallback(
    (event) => {
      if (!enabled) return;

      const currentTime = performance.now();
      const timeSinceLastTap = currentTime - lastTapTimeRef.current;

      // Check if this is part of a double-tap sequence
      if (timeSinceLastTap < debounceDelay) {
        // This is the second tap within the debounce window
        tapCountRef.current = 2;
      } else {
        // This is a new tap sequence
        tapCountRef.current = 1;
      }

      lastTapTimeRef.current = currentTime;

      // If we have a double-tap, trigger callback
      if (tapCountRef.current === 2) {
        onDoubleTap();
        reset();
        return;
      }

      // Clear existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set timer to reset tap count if no second tap arrives
      debounceTimerRef.current = setTimeout(() => {
        reset();
      }, debounceDelay);
    },
    [enabled, debounceDelay, onDoubleTap, reset]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    // Use pointerdown for cross-device support (mouse + touch)
    element.addEventListener('pointerdown', handlePointerDown);
    isListeningRef.current = true;

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      isListeningRef.current = false;

      // Cleanup timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [enabled, handlePointerDown]);

  return {
    ref,
    isListening: isListeningRef.current,
    reset,
    tapCount: tapCountRef.current,
    lastTapTime: lastTapTimeRef.current,
  };
};

export default useDoublePointerDown;
