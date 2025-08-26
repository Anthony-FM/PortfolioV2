import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * @typedef {Object} BlockMaskProps
 * @property {import('framer-motion').MotionValue<number>} scale - Valeur dynamique d'échelle appliquée au masque (zoom).
 * @property {string} color - Couleur utilisée pour remplir les rectangles du masque SVG.
 */

/**
 * Composant React affichant un ensemble de rectangles SVG pour créer un masque graphique animé.
 *
 * Le masque s'adapte à l'échelle définie dynamiquement via Framer Motion (`scale`) et utilise
 * une animation fluide grâce à un `spring`. Il s'adapte également au redimensionnement de l'écran.
 *
 * @param {BlockMaskProps} props - Propriétés du composant.
 * @returns {JSX.Element} Masque SVG animé avec des rectangles verticaux.
 */
function BlockMask({ scale, color, titleRef }) {
  /**
   * Échelle animée (spring) appliquée au conteneur principal.
   */
  const springScale = useSpring(scale, {
    stiffness: 200,
    damping: 80,
  });

  /**
   * État représentant la taille actuelle de la fenêtre pour permettre des ajustements futurs.
   * @type {[{ width: number, height: number }, Function]}
   */
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /**
   * Écoute les changements de taille de la fenêtre pour mettre à jour le `viewport`.
   */
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Données statiques représentant chaque rectangle du masque SVG.
   * Chaque objet contient un `x` (position horizontale) et une `width` (largeur).
   */
  const rects = [
    { id: '_x31_', x: 75.387, width: 69.333 },
    { id: '_x32_', x: 144.761, width: 61.21 },
    { id: '_x33_', x: 205.971, width: 63 },
    { id: '_x34_', x: 268.971, width: 57.75 },
    { id: '_x35_', x: 326.721, width: 58.75 },
    { id: '_x36_', x: 385.471, width: 61.5 },
    { id: '_x37_', x: 446.971, width: 74.25 },
    { id: '_x38_', x: 521.221, width: 59.75 },
    { id: '_x39_', x: 580.971, width: 58.084 },
    { id: '_x31_0', x: 639.055, width: 58.916 },
    { id: '_x31_1', x: 698.219, width: 61.002 },
    { id: '_x31_2', x: 759.221, width: 65.5 },
    { id: '_x31_3', x: 824.721, width: 28 },
    { id: '_x31_4', x: 852.721, width: 89 },
    { id: '_x31_5', x: 941.721, width: 66.5 },
    { id: '_x31_6', x: 1008.221, width: 60.75 },
    { id: '_x31_7', x: 1068.971, width: 65.928 },
  ];

  return (
    <motion.div
      className="BlockMaskContainer"
      style={{ scale: springScale }}
      ref={titleRef}

    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1210.439 397.48"
        preserveAspectRatio="xMidYMid meet"
        className="BlockMaskSVG"
      >
        {rects.map((rect, index) => (
          <motion.rect
            key={rect.id}
            id={rect.id}
            x={rect.x}
            y={1}
            width={rect.width}
            height={397.48}
            fill={color}
            className={`rect--${index + 1}`}
            initial={{ opacity: 1, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3 + (index * 0.03),
              duration: 0.9,
              ease: 'easeOut',
              opacity: 0
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

export default BlockMask;
