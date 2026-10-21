import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * CharacterAnimation Component
 * Displays Lapis Lazuli character with alternating frame animation
 * Creates arm movement effect by swapping between two image frames at configurable rate
 *
 * Props:
 * - config: { frame1ImagePath, frame2ImagePath, frameRate, size, fallbackImagePath }
 * - isPlaying: boolean - whether animation should play
 * - onFrameChange: callback when frame changes
 * - onImageLoadError: callback when image fails to load
 */
const CharacterAnimation = ({
  config = {},
  isPlaying = true,
  onFrameChange = () => {},
  onImageLoadError = () => {},
}) => {
  const {
    frame1ImagePath = '',
    frame2ImagePath = '',
    frameRate = 1,
    size = 'large',
    fallbackImagePath = null,
  } = config;

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const lastFrameUpdateRef = useRef(0);
  const animationFrameRef = useRef(null);

  const frameImages = [frame1ImagePath, frame2ImagePath];

  // Calculate frame switch interval in milliseconds
  const frameIntervalMs = frameRate > 0 ? 1000 / frameRate : 1000;

  // Animation loop using requestAnimationFrame for 60fps rendering
  useEffect(() => {
    if (!isPlaying || hasError) {
      return;
    }

    const animate = (currentTime) => {
      const timeSinceLastFrame = currentTime - lastFrameUpdateRef.current;

      // Check if enough time has passed to switch frames
      if (timeSinceLastFrame >= frameIntervalMs) {
        setCurrentFrameIndex((prevIndex) => {
          const nextIndex = prevIndex === 0 ? 1 : 0;
          onFrameChange(nextIndex);
          return nextIndex;
        });
        lastFrameUpdateRef.current = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, frameIntervalMs, hasError, onFrameChange]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = (event) => {
    console.warn('Failed to load character frame:', event.target.src);
    setHasError(true);
    onImageLoadError(new Error(`Failed to load image: ${event.target.src}`), currentFrameIndex);
  };

  const currentImagePath = frameImages[currentFrameIndex];
  const displayImagePath = hasError ? fallbackImagePath : currentImagePath;

  // Size mapping
  const sizeMap = {
    small: {
      maxWidth: '150px',
      maxHeight: '200px',
    },
    medium: {
      maxWidth: '200px',
      maxHeight: '300px',
    },
    large: {
      maxWidth: '300px',
      maxHeight: '400px',
    },
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const imageStyle = {
    maxWidth: sizeMap[size]?.maxWidth || '300px',
    maxHeight: sizeMap[size]?.maxHeight || '400px',
    width: 'auto',
    height: 'auto',
    imageRendering: 'pixelated',
    userSelect: 'none',
    pointerEvents: 'none',
    ...(!isLoaded && { visibility: 'hidden' }),
  };

  return (
    <div className="character-animation" style={containerStyle}>
      {displayImagePath ? (
        <img
          src={displayImagePath}
          alt="Lapis character frame"
          className="character-frame"
          style={imageStyle}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        <div style={{ color: '#ff6b6b', fontSize: '18px' }}>
          Character image path not configured
        </div>
      )}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: 'absolute',
            fontSize: '14px',
            color: '#666',
          }}
        >
          Loading...
        </div>
      )}
      {hasError && !fallbackImagePath && (
        <div
          style={{
            position: 'absolute',
            fontSize: '14px',
            color: '#ff6b6b',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          Failed to load character image
        </div>
      )}
    </div>
  );
};

export default CharacterAnimation;
