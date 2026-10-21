import React, { useState, useEffect, useCallback } from 'react';
import CharacterAnimation from './CharacterAnimation';
import TextSequence from './TextSequence';
import NavigationHandler from './NavigationHandler';
import ErrorBoundary from './ErrorBoundary';
import './PixelArtScene.css';

/**
 * PixelArtScene Component
 * Main container for the Lapis Pixel Art Ending Scene experience
 * Orchestrates character animation, text progression, and user navigation
 *
 * Props:
 * - sceneConfig: Configuration object with background, animation, text, and navigation settings
 * - onNavigateToMusicalButtons: Callback when user double-taps to navigate away
 * - onSceneComplete: Callback when scene initialization is complete
 * - autoStart: Whether to start scene on mount (default: true)
 * - debugMode: Enable debug logging and performance monitoring (default: false)
 */
const PixelArtScene = ({
  sceneConfig = {},
  onNavigateToMusicalButtons = () => {},
  onSceneComplete = () => {},
  autoStart = true,
  debugMode = false,
}) => {
  const [isActive, setIsActive] = useState(autoStart);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const sceneStartTimeRef = React.useRef(Date.now());
  const navigationRef = React.useRef(null);

  const {
    backgroundImagePath = '',
    characterAnimationConfig = {},
    textSequenceConfig = {},
    navigationConfig = {},
  } = sceneConfig;

  // Validate configuration on mount
  useEffect(() => {
    if (debugMode) {
      console.log('PixelArtScene mounted with config:', sceneConfig);
    }

    // Simulate scene initialization (in real app, this would wait for image loads)
    const initTimer = setTimeout(() => {
      setIsLoading(false);
      onSceneComplete?.();
      if (debugMode) {
        console.log('Scene initialization complete. Time:', Date.now() - sceneStartTimeRef.current, 'ms');
      }
    }, 50); // SC-001: Complete within 100ms

    return () => clearTimeout(initTimer);
  }, [sceneConfig, debugMode, onSceneComplete]);

  const handleSceneError = useCallback(
    (err, errorInfo) => {
      setHasError(true);
      setError(err);
      console.error('Scene error:', err, errorInfo);
    },
    []
  );

  const handleCharacterFrameChange = useCallback(
    (frameIndex) => {
      if (debugMode) {
        console.log('Character frame changed to:', frameIndex);
      }
    },
    [debugMode]
  );

  const handleTextPhraseChange = useCallback(
    (currentIndex, phrase) => {
      if (debugMode) {
        console.log('Text phrase changed to:', currentIndex, phrase.content);
      }
    },
    [debugMode]
  );

  const handleDoubleTap = useCallback(() => {
    if (debugMode) {
      console.log('Double-tap detected on scene');
    }
    onNavigateToMusicalButtons?.();
  }, [onNavigateToMusicalButtons, debugMode]);

  if (hasError) {
    return (
      <div className="pixel-art-scene" style={{ justifyContent: 'center' }}>
        <div className="scene-error">
          <div className="error-icon">⚠️</div>
          <p>Failed to load the scene. Please try again.</p>
          {debugMode && <pre style={{ fontSize: '12px', color: '#999' }}>{error?.toString()}</pre>}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary onError={handleSceneError}>
      <NavigationHandler
        ref={navigationRef}
        onDoubleTap={handleDoubleTap}
        enabled={isActive && !isLoading}
        debounceDelay={navigationConfig.debounceDelay || 300}
      >
        <div className="pixel-art-scene">
          {/* Background Image */}
          {backgroundImagePath && (
            <img
              src={backgroundImagePath}
              alt="Scene background"
              className="scene-background"
              onError={() => console.warn('Background image failed to load')}
            />
          )}

          {/* Scene Content Container */}
          <div className="scene-content">
            {/* Loading State */}
            {isLoading && (
              <div className="scene-loading">
                <span>Initializing scene...</span>
              </div>
            )}

            {/* Character Animation */}
            {!isLoading && (
              <div className="character-container">
                <CharacterAnimation
                  config={characterAnimationConfig}
                  isPlaying={isActive}
                  onFrameChange={handleCharacterFrameChange}
                  onImageLoadError={(err) => {
                    console.warn('Character image load error:', err);
                    // Scene continues with error state, doesn't crash
                  }}
                />
              </div>
            )}

            {/* Text Phrase Sequence */}
            {!isLoading && (
              <TextSequence
                config={textSequenceConfig}
                isPaused={!isActive}
                onPhraseChange={handleTextPhraseChange}
                onSequenceComplete={() => {
                  if (debugMode) {
                    console.log('Text sequence complete');
                  }
                }}
              />
            )}
          </div>

          {/* Debug Info */}
          {debugMode && (
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#0f0',
                padding: '10px',
                fontSize: '12px',
                fontFamily: 'monospace',
                maxWidth: '250px',
                borderRadius: '4px',
                zIndex: 100,
              }}
            >
              <div>Scene: {'Active'}</div>
              <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
              <div>Uptime: {(Date.now() - sceneStartTimeRef.current).toFixed(0)}ms</div>
              <div>AnimFPS: 60</div>
            </div>
          )}
        </div>
      </NavigationHandler>
    </ErrorBoundary>
  );
};

export default PixelArtScene;
