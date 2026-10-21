import { useCallback, useEffect, useRef } from 'react';
import { ballAudioSource } from '../data/ballAudioConfig';

export default function useBallAudio() {
  const audioRef = useRef(null);
  const autoplayAttempted = useRef(false);
  const autoplayBlocked = useRef(false);
  const fallbackConsumed = useRef(false);

  useEffect(() => {
    const audio = new Audio(ballAudioSource);
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => {
      audio.currentTime = 0;
    };

    const handleFallbackPointerDown = (event) => {
      if (fallbackConsumed.current) {
        return;
      }

      fallbackConsumed.current = true;
      document.removeEventListener('pointerdown', handleFallbackPointerDown);

      if (
        autoplayBlocked.current &&
        !(event.target instanceof Element && event.target.closest('.ball-audio-control')) &&
        audio.paused
      ) {
        audio.currentTime = 0;
        void audio.play().catch((error) => {
          console.error('No se pudo reproducir el audio del balón mediante el fallback.', error);
        });
      }
    };

    audio.addEventListener('ended', handleEnded);
    document.addEventListener('pointerdown', handleFallbackPointerDown);
    if (!autoplayAttempted.current) {
      autoplayAttempted.current = true;
      void audio.play().catch((error) => {
        if (error.name !== 'NotAllowedError') {
          console.error('No se pudo reproducir automáticamente el audio del balón.', error);
        } else {
          autoplayBlocked.current = true;
        }
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('ended', handleEnded);
      document.removeEventListener('pointerdown', handleFallbackPointerDown);
      audioRef.current = null;
    };
  }, []);

  return useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.currentTime = 0;
      void audio.play().catch((error) => {
        console.error('No se pudo reproducir el audio del balón.', error);
      });
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, []);
}
