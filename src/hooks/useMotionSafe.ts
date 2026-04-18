import { useEffect, useState } from 'react';

export function useMotionSafe(): boolean {
  const [motionSafe, setMotionSafe] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotionSafe(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return motionSafe;
}
