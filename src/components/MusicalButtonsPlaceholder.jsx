import React from 'react';
import { useDoublePointerDown } from '../hooks/useDoublePointerDown';

/**
 * MusicalButtonsPlaceholder Component
 * Placeholder stub for Musical Buttons experience
 * Demonstrates navigation flow between scenes
 *
 * Props:
 * - onNavigateToLapisScene: Callback to return to Lapis scene
 */
const MusicalButtonsPlaceholder = ({
  onNavigateToLapisScene = () => {},
}) => {
  const { ref } = useDoublePointerDown({
    debounceDelay: 300,
    onDoubleTap: onNavigateToLapisScene,
    enabled: true,
  });

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e90ff',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        cursor: 'pointer',
        userSelect: 'none',
        touchAction: 'manipulation',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🎵 Musical Buttons</h1>
        <p style={{ fontSize: '20px', marginBottom: '40px' }}>
          Coming Soon
        </p>
        <p style={{
          fontSize: '16px',
          opacity: 0.8,
          fontStyle: 'italic',
        }}>
          Double-tap to return to Lapis Scene
        </p>
        
        {/* Visual indicator for double-tap target */}
        <div
          style={{
            marginTop: '60px',
            padding: '40px',
            border: '2px dashed rgba(255,255,255,0.5)',
            borderRadius: '8px',
            opacity: 0.6,
          }}
        >
          <p style={{ fontSize: '14px' }}>Tap anywhere to navigate</p>
        </div>
      </div>
    </div>
  );
};

export default MusicalButtonsPlaceholder;
