import { useEffect } from 'react';
import CountdownDisplay from './CountdownDisplay';
import BouncingBall from './BouncingBall';
import PhotoBackground from './PhotoBackground';
import { ballPhrases } from '../data/ballPhrases';
import useCountdown from '../hooks/useCountdown';
import useBallAudio from '../hooks/useBallAudio';
import usePhotoRotation from '../hooks/usePhotoRotation';
import useTripleTapToggle from '../hooks/useTripleTapToggle';

function CountdownScreen({ targetDate, rotationInterval, photos, onCountdownComplete }) {
  const time = useCountdown(targetDate);
  const activeIndex = usePhotoRotation(photos.length, rotationInterval);
  const activePhoto = photos[activeIndex];
  const [isBallVisible, handlePointerUp] = useTripleTapToggle();
  const toggleBallAudio = useBallAudio();

  // Call completion callback when countdown reaches zero
  useEffect(() => {
    if (time.complete && onCountdownComplete) {
      onCountdownComplete();
    }
  }, [time.complete, onCountdownComplete]);

  return (
    <main
      className="relative isolate flex min-h-screen min-h-[100dvh] w-full max-w-full items-center justify-center overflow-hidden bg-slate-900 px-2 py-6 sm:px-8 sm:py-8"
      onPointerUp={handlePointerUp}
    >
      <PhotoBackground photo={activePhoto} />
      <div className="absolute inset-0 bg-slate-950/55" aria-hidden="true" />
      {!time.complete && (
        <>
          {isBallVisible && (
            <BouncingBall phrases={ballPhrases} onPointerDown={toggleBallAudio} />
          )}
          <section className="relative z-10 flex w-full min-w-0 max-w-4xl flex-col items-center gap-5 text-center sm:gap-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75 sm:text-sm">
              Faltan
            </p>
            <CountdownDisplay time={time} />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75 sm:text-sm">
              para tu cumpleaños
            </p>
          </section>
        </>
      )}
    </main>
  );
}

export default CountdownScreen;
