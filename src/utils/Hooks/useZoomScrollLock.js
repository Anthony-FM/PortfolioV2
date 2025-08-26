import { useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { getLenis } from "./useLenis";

export function useZoomScrollLock({
  maxScale,
  scrollToId,
  backToId,
  zoomSpeed,
  easing,
  scrollDuration,
  delayBeforeScroll,
  delayAfterScroll,
}) {
  const scaleTarget = useMotionValue(1);
  const scaleSpring = useSpring(scaleTarget, { damping: 80, stiffness: 200 });
  const scaleRef = useRef(1);
  const hasScrolled = useRef(false);

  const [scrollLocked, setScrollLocked] = useState(false);
  const scrollLockedRef = useRef(false);
  const prevOverflow = useRef("");

  const lockScroll = () => {
    scrollLockedRef.current = true;
    setScrollLocked(true);
    prevOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
  };

  const unlockScroll = () => {
    scrollLockedRef.current = false;
    setScrollLocked(false);
    document.body.style.overflow = prevOverflow.current || "";
    getLenis()?.start();
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const lenis = getLenis();
      const delta = e.deltaY;

      if (scrollLockedRef.current) return;

      // Aller
      if (!hasScrolled.current) {
        if (
          (scaleRef.current < maxScale && delta > 0) ||
          (scaleRef.current > 1 && delta < 0)
        ) {
          e.preventDefault();
          lockScroll();

          let newScale = scaleRef.current + delta * zoomSpeed;
          newScale = Math.min(maxScale, Math.max(1, newScale));

          scaleRef.current = newScale;
          scaleTarget.set(newScale);

          if (newScale >= maxScale) {
            hasScrolled.current = true;
            setTimeout(() => {
              unlockScroll();
              lenis?.scrollTo(scrollToId, { duration: scrollDuration, easing });
            }, delayBeforeScroll);
          } else {
            setTimeout(unlockScroll, delayBeforeScroll);
          }
        }
      }

      // Retour
      else if (hasScrolled.current && delta < 0 && window.scrollY <= window.innerHeight * 0.1) {
        e.preventDefault();
        lockScroll();

        hasScrolled.current = false;
        scaleRef.current = 1;
        scaleTarget.set(1);

        setTimeout(() => {
          unlockScroll();
          lenis?.scrollTo(backToId, { duration: scrollDuration, easing });
        }, delayAfterScroll);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
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
  ]);

  return {
    scaleSpring,
    scaleRef,
    isLocked: scrollLocked,
  };
}
