import { useEffect, useRef, useState } from 'react';

const initialPosition = { x: 24, y: 24 };
const initialVelocity = { x: 180, y: 145 };

function getRandomPhrase(phrases, previousIndex) {
  let index = Math.floor(Math.random() * phrases.length);

  while (phrases.length > 1 && index === previousIndex) {
    index = Math.floor(Math.random() * phrases.length);
  }

  return { index, text: phrases[index] };
}

export default function useBouncingBall(phrases, ballSize = 64) {
  const [position, setPosition] = useState(initialPosition);
  const [phrase, setPhrase] = useState(null);
  const previousPhraseIndex = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    let lastTimestamp = performance.now();
    let velocity = { ...initialVelocity };
    let currentPosition = { ...initialPosition };

    const animate = (timestamp) => {
      const elapsed = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;
      let nextPosition = {
        x: currentPosition.x + velocity.x * elapsed,
        y: currentPosition.y + velocity.y * elapsed,
      };
      let touchedBorder = false;

      const maxX = Math.max(0, window.innerWidth - ballSize);
      const maxY = Math.max(0, window.innerHeight - ballSize);

      if (nextPosition.x <= 0 || nextPosition.x >= maxX) {
        nextPosition.x = Math.min(Math.max(nextPosition.x, 0), maxX);
        velocity = { ...velocity, x: -velocity.x };
        touchedBorder = true;
      }

      if (nextPosition.y <= 0 || nextPosition.y >= maxY) {
        nextPosition.y = Math.min(Math.max(nextPosition.y, 0), maxY);
        velocity = { ...velocity, y: -velocity.y };
        touchedBorder = true;
      }

      currentPosition = nextPosition;
      setPosition(nextPosition);

      if (touchedBorder && phrases.length > 0) {
        const nextPhrase = getRandomPhrase(phrases, previousPhraseIndex.current);
        previousPhraseIndex.current = nextPhrase.index;
        setPhrase((currentPhrase) => ({
          ...nextPhrase,
          id: (currentPhrase?.id ?? 0) + 1,
        }));
      }

      frameId.current = requestAnimationFrame(animate);
    };

    frameId.current = requestAnimationFrame(animate);

    const handleResize = () => {
      currentPosition = {
        x: Math.min(currentPosition.x, Math.max(0, window.innerWidth - ballSize)),
        y: Math.min(currentPosition.y, Math.max(0, window.innerHeight - ballSize)),
      };
      setPosition(currentPosition);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [ballSize, phrases]);

  return { position, phrase };
}
