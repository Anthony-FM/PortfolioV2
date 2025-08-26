import { motion, useTransform } from 'framer-motion';

// Utils
import { useLenis } from '../../utils/Hooks/useLenis';
import { useZoomScrollLock } from '../../utils/Hooks/useZoomScrollLock';

// Components
import BlockMask from './BlockMask/BlockMask';
import HeroText from './HeroText/HeroText';

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
    zoomSpeed: 0.05,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    scrollDuration: 1.9,
    delayBeforeScroll: 100,
    delayAfterScroll: 300
  });


  const scaleTransformMask = useTransform(scaleSpring, value => `${value * 100}%`);
  const scaleTransform = useTransform(scaleSpring, value => value );

  return (
    <section
      className="HomeSectionContainer"
      id="hero"
      style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
    >
      <motion.div className="heroWrapperContainer">        

        <div className="container">
          <div className="hero">
            <motion.img 
              src="src/assets/pictureOfMeBW.jpg" 
              alt="Anthony Fouda-Many Picture" 
              className="hero-image" 
              style={{
                WebkitMaskSize: scaleTransformMask
              }}
            /> 
          </div>
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
