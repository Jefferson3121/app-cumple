import React, { forwardRef } from 'react';
import { useDoublePointerDown } from '../hooks/useDoublePointerDown';

/**
 * NavigationHandler Component
 * Wraps scene content and detects double-tap gestures
 * Supports both mouse and touch input
 *
 * Props:
 * - onDoubleTap: Callback when double-tap detected
 * - debounceDelay: Milliseconds for tap debouncing (default: 300)
 * - enabled: Whether gesture detection is active (default: true)
 * - children: Content to wrap
 */
const NavigationHandler = forwardRef(
  (
    {
      onDoubleTap = () => {},
      debounceDelay = 300,
      enabled = true,
      children = null,
    },
    ref
  ) => {
    const { ref: gestureRef } = useDoublePointerDown({
      debounceDelay,
      onDoubleTap,
      enabled,
    });

    // Merge refs - use provided ref if available, otherwise use gesture ref
    React.useImperativeHandle(ref, () => gestureRef.current, [gestureRef]);

    return (
      <div
        ref={gestureRef}
        className="scene-navigation-target"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          cursor: 'pointer',
          touchAction: 'manipulation',
          userSelect: 'none',
        }}
      >
        {children}
      </div>
    );
  }
);

NavigationHandler.displayName = 'NavigationHandler';

export default NavigationHandler;
