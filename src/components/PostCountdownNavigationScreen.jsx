import { useEffect, useState } from 'react';
import { useDoublePointerDown } from '../hooks/useDoublePointerDown';




import frameOne from '../assets/photos/azul.jpg';
import frameTwo from '../assets/photos/twooo.jpg';

const animationFrames = [frameOne, frameTwo];
const frameDuration = 500;

function PostCountdownNavigationScreen({ label, onDoubleTap }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const { ref } = useDoublePointerDown({
    debounceDelay: 300,
    onDoubleTap,
    enabled: true,
  });

  useEffect(() => {
    const preloadedFrames = animationFrames.map((frame) => {
      const image = new Image();
      image.src = frame;
      return image;
    });

    const animationTimer = window.setInterval(() => {
      setFrameIndex((currentIndex) => (currentIndex + 1) % animationFrames.length);
    }, frameDuration);

    return () => {
      window.clearInterval(animationTimer);
      preloadedFrames.forEach((image) => {
        image.src = '';
      });
    };
  }, []);

  return (
    <main
      ref={ref}
      aria-label={label}
      style={{
        minHeight: '100dvh',
        width: '100%',
        overflow: 'auto',
        cursor: 'pointer',
        touchAction: 'manipulation',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          lineHeight: 0,
        }}
      >
        {animationFrames.map((frame, index) => (
          <img
            key={frame}
            src={frame}
            alt=""
            draggable="false"
            aria-hidden={index !== frameIndex}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              opacity: index === frameIndex ? 1 : 0,
              position: index === 0 ? 'relative' : 'absolute',
              inset: index === 0 ? undefined : 0,
              transition: 'none',
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
    </main>
  );
}

export default PostCountdownNavigationScreen;
