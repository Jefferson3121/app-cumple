import { useCallback, useEffect, useRef } from 'react';
import { audioSources } from '../data/audioConfig';

export default function useAudioPlayer() {
  const audioElements = useRef(new Map());
  const activeKey = useRef(null);
  const activeAudio = useRef(null);

  const getAudio = useCallback((key) => {
    const existingAudio = audioElements.current.get(key);
    if (existingAudio) {
      return existingAudio;
    }

    const audio = new Audio(audioSources[key]);
    audio.preload = 'auto';
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      if (activeKey.current === key) {
        activeKey.current = null;
        activeAudio.current = null;
      }
    });
    audioElements.current.set(key, audio);
    return audio;
  }, []);

  const toggleAudio = useCallback(
    (key) => {
      const audio = getAudio(key);

      if (activeKey.current === key) {
        if (audio.paused) {
          void audio.play().catch((error) => {
            console.error(`No se pudo reanudar el audio de ${key}.`, error);
          });
        } else {
          audio.pause();
        }
        return;
      }

      if (activeAudio.current) {
        activeAudio.current.pause();
        activeAudio.current.currentTime = 0;
      }

      audio.currentTime = 0;
      activeKey.current = key;
      activeAudio.current = audio;
      void audio.play().catch((error) => {
        console.error(`No se pudo reproducir el audio de ${key}.`, error);
      });
    },
    [getAudio],
  );

  useEffect(
    () => () => {
      audioElements.current.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      audioElements.current.clear();
    },
    [],
  );

  return toggleAudio;
}
