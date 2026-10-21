import { useEffect, useRef, useState } from 'react';

function PhotoBackground({ photo }) {
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const [incomingPhoto, setIncomingPhoto] = useState(null);
  const [currentMotionIndex, setCurrentMotionIndex] = useState(0);
  const [incomingMotionIndex, setIncomingMotionIndex] = useState(1);
  const motionIndex = useRef(0);
  const transitionTimer = useRef(null);

  useEffect(() => {
    if (!photo || photo.source === currentPhoto?.source) {
      return undefined;
    }

    setIncomingPhoto(photo);
    motionIndex.current = (motionIndex.current + 1) % 3;
    setIncomingMotionIndex(motionIndex.current);
    transitionTimer.current = window.setTimeout(() => {
      setCurrentPhoto(photo);
      setCurrentMotionIndex(motionIndex.current);
      setIncomingPhoto(null);
    }, 1600);

    return () => window.clearTimeout(transitionTimer.current);
  }, [currentPhoto?.source, photo]);

  return (
    <div
      aria-hidden="true"
      className="photo-background absolute inset-0 bg-slate-900"
    >
      {currentPhoto && (
        <div className={`photo-layer ${incomingPhoto ? 'photo-layer-exit' : ''}`}>
          <div
            className={`photo-image photo-motion-${currentMotionIndex}`}
            style={{ backgroundImage: `url("${currentPhoto.source}")` }}
          />
        </div>
      )}
      {incomingPhoto && (
        <div className="photo-layer photo-layer-enter">
          <div
            className={`photo-image photo-motion-${incomingMotionIndex}`}
            style={{ backgroundImage: `url("${incomingPhoto.source}")` }}
          />
        </div>
      )}
    </div>
  );
}

export default PhotoBackground;
