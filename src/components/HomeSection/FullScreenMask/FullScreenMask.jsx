import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValueEvent } from 'framer-motion';

/**
 * @typedef {Object} Mask
 * @property {number} width - Largeur du masque.
 * @property {number} height - Hauteur du masque.
 * @property {number} x - Position horizontale (X) du masque.
 * @property {number} y - Position verticale (Y) du masque.
 */

/**
 * Composant React affichant un masque SVG centré autour d’un titre,
 * avec une "fenêtre" qui s’agrandit/rétrécit selon le `scale`.
 *
 * @component
 * @param {Object} props - Propriétés.
 * @param {number} props.titleWidth
 * @param {number} props.titleHeight
 * @param {number} props.titleX
 * @param {number} props.titleY
 * @param {import('framer-motion').MotionValue<number>} props.scale
 * @returns {JSX.Element}
 */
export default function FullScreenMask({ 
    titleWidth, 
    titleHeight, 
    titleX, 
    titleY, 
    scale 
  }) {
    
  const springScale = useSpring(scale, { stiffness: 400, damping: 60 });
  const [mask, setMask] = useState({
    width: titleWidth * 0.98,
    height: titleHeight * 0.98,
    x: titleX * 1.01,
    y: titleY * 1.01,
  });

  const rafId = useRef(null);

  const updateMask = useCallback((currentScale = scale.get()) => {
    if (!titleWidth || !titleHeight || !titleX || !titleY) return;

    const scaledWidth = titleWidth * 0.95 * currentScale;
    const scaledHeight = titleHeight * 0.95 * currentScale;

    setMask({
      width: scaledWidth,
      height: scaledHeight,
      x: titleX * 1.01,
      y: titleY * 1.02,
    });
  }, [scale, titleWidth, titleHeight, titleX, titleY])

  useMotionValueEvent(scale, 'change', (currentScale) => {
    if (!titleWidth || !titleHeight || !titleX || !titleY) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => updateMask(currentScale));
  });

  useEffect(() => {
    const handleResize = () => {
      updateMask();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [titleWidth, titleHeight, titleX, titleY, updateMask]);



  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const { width, height, x, y } = mask;

  return (
    <motion.div className="overlayContainer" aria-hidden="true">
      <svg className="svgMask" width="100%" height="100%" role="presentation">
        <mask id="hole-mask" x="0" y="0" width="100%" height="100%">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect x={x} y={y} width={width} height={height} fill="black" />
        </mask>
      </svg>

      <motion.div
        className="overlay-mask"
        style={{
          scale: springScale,
          transformOrigin: 'center',
        }}
      />
    </motion.div>
  );
}
