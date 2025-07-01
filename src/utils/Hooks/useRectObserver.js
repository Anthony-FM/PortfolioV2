import { useEffect, useState } from 'react';

/**
 * Observe les dimensions et la position d'un élément DOM.
 * Met à jour automatiquement les valeurs lors des redimensionnements et scrolls.
 * 
 * @param {React.RefObject<HTMLElement>} ref - Référence de l'élément à observer
 * @returns {{ x: number, y: number, width: number, height: number }}
 */
export function useRectObserver(ref) {
  const [rect, setRect] = useState({ x: null, y: null, width: null, height: null });

  useEffect(() => {
    if (!ref.current) return;

    let animationFrame;

    const updateRect = () => {
      if (!ref.current) return;
      const domRect = ref.current.getBoundingClientRect();
      setRect({
        x: domRect.x,
        y: domRect.y,
        width: domRect.width,
        height: domRect.height
      });
    };

    const handleScrollOrResize = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateRect);
    };

    const resizeObserver = new ResizeObserver(handleScrollOrResize);
    resizeObserver.observe(ref.current);

    window.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);

    updateRect(); // appel initial

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [ref]);

  return rect;
}
