import { motion, useReducedMotion } from 'framer-motion';

/**
 * @typedef {Object} ButtonAnimatedProps
 * @property {string} text - Le texte à afficher dans le bouton (chaque lettre sera animée).
 * @property {Function} action - La fonction à appeler lors du clic.
 */

/**
 * Composant bouton avec animation accessible sur chaque lettre.
 *
 * @param {ButtonAnimatedProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Bouton avec texte animé.
 */
export default function ButtonAnimated({ text, action }) {
  const shouldReduceMotion = useReducedMotion();
  let ariaText = "Cliqué pour entrer dans le portfolio"

  return (
    <motion.button
      type="button"
      className="animated-button"
      onClick={action}
      aria-label={ariaText} 
    >
      <div 
        className="buttonContainer" 
        aria-hidden="true"
      >

        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="jump-letter mulish"
            animate={
              shouldReduceMotion
                ? { y: 0 }
                : { y: [0, -8, 0, -4, 0] }
            }
            transition={
              shouldReduceMotion
                ? {}
                : {
                    delay: index * 0.1,
                    duration: 1.5,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'loop'
                  }
            }
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </motion.button>
  );
}