import { useRef, useState, useEffect } from 'react';

/**
 * useCounter — animates a number from 0 to `target` when in view
 * @param {number} target - target value
 * @param {number} duration - animation duration in ms (default 2000)
 * @param {boolean} inView - trigger when true
 */
const useCounter = (target, duration = 2000, inView = false) => {
  const [count, setCount] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();
    const startVal = 0;

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.floor(startVal + (target - startVal) * easedProgress));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else setCount(target);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, inView]);

  return count;
};

export default useCounter;
