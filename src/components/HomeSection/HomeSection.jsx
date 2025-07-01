import { useRef, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';

// Utils
import { useLenis } from '../../utils/Hooks/useLenis';
import { useZoomScrollLock } from '../../utils/Hooks/useZoomScrollLock';

// Components
import BlockMask from './BlockMask/BlockMask';
import HeroText from './HeroText/HeroText';
import TitleComponent from './TitleComponent/TitleComponent';
import FullScreenMask from './FullScreenMask/FullScreenMask';
import { useRectObserver } from '../../utils/Hooks/useRectObserver';

/**
 * Composant principal de la section d'accueil.
 * Gère les dimensions et la position du titre pour synchroniser les masques SVG,
 * et permet un zoom dynamique avec la molette.
 *
 * @component
 * @returns {JSX.Element} Section d'accueil avec masques, titre et texte.
 */
function HomeSection() {

  useLenis();

  const {
    scaleSpring, // spring animé
    isLocked,    // pour éviter tout scroll/zoom conflictuel
  } = useZoomScrollLock({
    maxScale: 30,
    scrollToId: '#about',
    backToId: '#hero',
    zoomSpeed: 0.1,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    scrollDuration: 0.2,
    delayBeforeScroll: 300,
    delayAfterScroll: 300
  });

  const titleRef = useRef(null);
  const { width, height, x, y } = useRectObserver(titleRef);

  const scaleTransform = useTransform(scaleSpring, value => value);

  const isReady = width != null && height != null && x != null && y != null;

  return (
    <section
      className="HomeSectionContainer"
      id="hero"
      style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
    >
      <motion.div className="heroWrapperContainer">
        {/* Masque plein écran, synchronisé avec les dimensions du titre */}
        {isReady && (
          <FullScreenMask
            titleWidth={width}
            titleHeight={height}
            titleY={y}
            titleX={x}
            scale={scaleTransform}
          />
        )}

        {/* Conteneur du titre avec SVGs animés */}
        <div 
          className="heroWrapperContainer_heroTitle" 
          ref={titleRef}
        >
          <TitleComponent 
            scale={scaleTransform} 
            color="#1F271B" 
          />
          <BlockMask 
            scale={scaleTransform} 
            color="#1F271B" 
          />
        </div>

        {/* Texte sous le titre */}
        <div 
          className="heroWrapperContainer_heroText"
                  
        >          
          <HeroText 
            transformScale={scaleTransform}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default HomeSection;
