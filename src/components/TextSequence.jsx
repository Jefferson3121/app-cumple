import React, { useState, useEffect, useRef } from 'react';

/**
 * TextSequence Component
 * Displays text phrases one at a time with configurable duration and transitions
 * Handles phrase progression, smooth transitions, and state preservation
 *
 * Props:
 * - config: { phrases: [], defaultTransitionStyle, defaultPositionClass }
 * - isPaused: boolean - whether to pause phrase progression
 * - onPhraseChange: callback when phrase changes
 * - onSequenceComplete: callback when all phrases displayed
 */
const TextSequence = ({
  config = { phrases: [] },
  isPaused = false,
  onPhraseChange = () => {},
  onSequenceComplete = () => {},
}) => {
  const { phrases = [], defaultTransitionStyle = 'fade', defaultPositionClass = 'bottom-center' } = config;

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [displayedPhrases, setDisplayedPhrases] = useState(new Set());
  const phraseTimerRef = useRef(null);
  const visiblePhraseRef = useRef(null);

  // Filter out empty phrases for display
  const validPhrases = phrases.filter((phrase) => phrase.content && phrase.content.trim() !== '');

  useEffect(() => {
    if (isPaused || validPhrases.length === 0) {
      return;
    }

    const currentPhrase = validPhrases[currentPhraseIndex];
    if (!currentPhrase) {
      return;
    }

    // Get display duration, default to 2000ms if invalid
    const duration =
      currentPhrase.displayDuration && currentPhrase.displayDuration > 100
        ? currentPhrase.displayDuration
        : 2000;

    // Update refs and callbacks
    visiblePhraseRef.current = currentPhrase;
    onPhraseChange(currentPhraseIndex, currentPhrase);

    // Track displayed phrases
    setDisplayedPhrases((prev) => new Set(prev).add(currentPhrase.id));

    // Set timer for next phrase
    phraseTimerRef.current = setTimeout(() => {
      const nextIndex = currentPhraseIndex + 1;

      if (nextIndex < validPhrases.length) {
        // Move to next phrase
        setCurrentPhraseIndex(nextIndex);
      } else {
        // Sequence complete - stay on last phrase per FR-012
        setIsComplete(true);
        onSequenceComplete?.();
      }
    }, duration);

    return () => {
      if (phraseTimerRef.current) {
        clearTimeout(phraseTimerRef.current);
      }
    };
  }, [currentPhraseIndex, validPhrases, isPaused, onPhraseChange, onSequenceComplete]);

  // If no valid phrases, show nothing
  if (validPhrases.length === 0) {
    return null;
  }

  const currentPhrase = validPhrases[currentPhraseIndex];
  if (!currentPhrase) {
    return null;
  }

  const transitionStyle = currentPhrase.transitionStyle || defaultTransitionStyle;
  const positionClass = currentPhrase.positionClass || defaultPositionClass;

  return (
    <div className="text-phrase-container">
      <div
        className={`text-phrase ${transitionStyle}`}
        style={{
          key: currentPhrase.id,
          animation:
            transitionStyle === 'slide'
              ? 'slideInOut 0.3s ease-in-out'
              : 'fadeInOut 0.3s ease-in-out',
        }}
      >
        {currentPhrase.content}
      </div>
    </div>
  );
};

export default TextSequence;
