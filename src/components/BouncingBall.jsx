import useBouncingBall from '../hooks/useBouncingBall';

function BouncingBall({ phrases, onPointerDown }) {
  const ballSize = 64;
  const { position, phrase } = useBouncingBall(phrases, ballSize);
  const phraseLeft = Math.min(position.x + ballSize + 8, window.innerWidth - 184);
  const phraseTop = Math.min(Math.max(position.y - 8, 8), window.innerHeight - 56);

  return (
    <>
      <div
        aria-label="Reproducir o detener el audio del balón"
        className="ball-audio-control pointer-events-auto fixed z-20 flex h-16 w-16 cursor-pointer items-center justify-center text-white"
        onPointerDown={onPointerDown}
        role="button"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <svg
          aria-hidden="true"
          className="h-full w-full drop-shadow-lg"
          fill="none"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 11C25 18 37 18 52 10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 52C23 43 35 43 54 53" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 5C24 18 22 29 14 42C11 47 10 51 11 55" stroke="currentColor" strokeWidth="1.8" />
          <path d="M44 5C39 17 41 28 50 40C54 46 55 51 53 57" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5 28C17 34 27 34 39 29C48 25 55 25 61 28" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </div>
      {phrase && (
        <span
          aria-hidden="true"
          className="ball-phrase pointer-events-none fixed z-20 w-fit max-w-[calc(100vw-1rem)] text-xs font-semibold leading-tight text-white"
          key={phrase.id}
          style={{ left: phraseLeft, top: phraseTop }}
        >
          {phrase.text}
        </span>
      )}
    </>
  );
}

export default BouncingBall;
