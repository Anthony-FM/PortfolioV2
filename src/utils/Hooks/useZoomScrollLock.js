import { useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { getLenis } from "./useLenis";

export function useZoomScrollLock({
  maxScale ,
  scrollToId,
  backToId ,
  zoomSpeed,
  easing ,
  scrollDuration ,
  delayBeforeScroll ,
  delayAfterScroll 
}) {
  const scaleTarget = useMotionValue(1);
  const scaleSpring = useSpring(scaleTarget, { damping: 80, stiffness: 200 });
  const scaleRef = useRef(1);
  const hasScrolled = useRef(false);
  const [scrollLocked, setScrollLocked] = useState(false);

  useEffect(() => {
    const handleWheel = (e) => {
      const lenis = getLenis();
      const delta = e.deltaY;

      // Aller
      if (!hasScrolled.current && !scrollLocked) {
        if ((scaleRef.current < maxScale && delta > 0) || (scaleRef.current > 1 && delta < 0)) {
          e.preventDefault();
          setScrollLocked(true);
          document.body.style.overflow = 'hidden';
          if (lenis) lenis.stop();

          let newScale = scaleRef.current + delta * zoomSpeed;
          newScale = Math.min(maxScale, Math.max(1, newScale));

          scaleRef.current = newScale;
          scaleTarget.set(newScale);

          if (newScale >= maxScale) {
            hasScrolled.current = true;
            setTimeout(() => {
              if (lenis) lenis.start();
              document.body.style.overflow = '';
              setScrollLocked(false);
              lenis?.scrollTo(scrollToId, {
                duration: scrollDuration,
                easing,
              });
            }, delayBeforeScroll);
          } else {
            setTimeout(() => {
              if (lenis) lenis.start();
              document.body.style.overflow = '';
              setScrollLocked(false);
            }, delayBeforeScroll);
          }
        }
      }

      // Retour
      else if (hasScrolled.current && !scrollLocked) {
        if (delta < 0 && window.scrollY <= window.innerHeight * 0.1) {
          e.preventDefault();
          setScrollLocked(true);
          document.body.style.overflow = 'hidden';
          if (lenis) lenis.stop();

          hasScrolled.current = false;
          scaleRef.current = 1;
          scaleTarget.set(1);

          setTimeout(() => {
            if (lenis) lenis.start();
            document.body.style.overflow = '';
            setScrollLocked(false);
            lenis?.scrollTo(backToId, {
              duration: scrollDuration,
              easing,
            });
          }, delayAfterScroll);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [
    maxScale,
    scrollToId,
    backToId,
    zoomSpeed,
    easing,
    scrollDuration,
    delayBeforeScroll,
    delayAfterScroll,
    scaleTarget,
    scrollLocked
  ]);

  return {
    scaleSpring,
    scaleRef,
    isLocked: scrollLocked,
  };
}
