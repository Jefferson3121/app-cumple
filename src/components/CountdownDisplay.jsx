import { useState } from 'react';
import useAudioPlayer from '../hooks/useAudioPlayer';

const units = [
  ['days', 'Días'],
  ['hours', 'Horas'],
  ['minutes', 'Minutos'],
  ['seconds', 'Segundos'],
];

function CountdownDisplay({ time }) {
  const [animation, setAnimation] = useState({ key: null, id: 0 });
  const [pressedUnit, setPressedUnit] = useState(null);
  const toggleAudio = useAudioPlayer();

  function activateUnit(key) {
    setAnimation((currentAnimation) => ({
      key,
      id: currentAnimation.id + 1,
    }));
    toggleAudio(key);
  }

  function handleKeyDown(event, key) {
    if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      activateUnit(key);
    }
  }

  return (
    <div
      aria-label="Cuenta regresiva"
      className="grid w-full max-w-3xl min-w-0 grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4"
    >
      {units.map(([key, label]) => (
        <button
          aria-label={`${label}: ${time[key]}`}
          className="countdown-unit min-w-0 rounded-2xl border border-white/20 bg-black/35 px-1.5 py-3 text-center shadow-lg backdrop-blur-sm sm:px-4 sm:py-5"
          data-pressed={pressedUnit === key}
          onAnimationEnd={() => setAnimation({ key: null, id: animation.id })}
          onKeyDown={(event) => handleKeyDown(event, key)}
          onPointerCancel={() => setPressedUnit(null)}
          onPointerDown={() => {
            setPressedUnit(key);
            activateUnit(key);
          }}
          onPointerUp={() => setPressedUnit(null)}
          type="button"
          key={key}
        >
          <span
            key={animation.key === key ? animation.id : 'static'}
            className={animation.key === key ? 'countdown-unit-bounce block' : 'block'}
          >
            <strong className="block text-[clamp(1.75rem,12vw,3.75rem)] font-bold leading-none tabular-nums tracking-tight">
              {String(time[key]).padStart(2, '0')}
            </strong>
            <span className="mt-2 block break-words text-[clamp(0.55rem,2.5vw,0.875rem)] font-semibold uppercase leading-tight tracking-[0.08em] text-white/75">
              {label}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

export default CountdownDisplay;
