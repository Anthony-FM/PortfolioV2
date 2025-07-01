// utils/useLenis.js
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export function useLenis() {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 0.4,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      lenisInstance = null;
    };
  }, []);
}
