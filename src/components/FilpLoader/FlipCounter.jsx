import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlipDigit from "./FilpDigit.jsx/FlipDigit";

/**
 * @typedef {Object} FlipCounterProps
 * @property {() => void} onFinish - Fonction appelée lorsque le compteur atteint 100.
 * @property {number} [speed] - Vitesse de progression (en ms). (Par défaut : 50)
 * @property {number} [step] - Valeur max par incrément. (Par défaut : 3)
 * @property {number} [animationDuration] - Durée de l’animation des chiffres.
 * @property {number} [holdDuration] - Pause après 100 avant de déclencher `onFinish`. (Par défaut : 500ms)
 */

/**
 * Compteur animé de 0 à 100 avec effet "flip" et son à chaque changement.
 *
 * @param {FlipCounterProps} props
 * @returns {JSX.Element}
 */
export default function FlipCounter({
  onFinish,
  speed = 50,
  step = 3,
  animationDuration = 500,
  holdDuration = 500
}) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  let [ flipBackground, setFlipBackground] = useState("dark-bg")


  // Incrémentation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = Math.floor(Math.random() * step + 1);
        return Math.min(prev + increment, 100);
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed, step]);

  // Quand on atteint 100 → onFinish avec délai
  useEffect(() => {
    if (progress >= 100) {
      setIsHolding(true);
      const timeout = setTimeout(() => {
        setIsHolding(false);
        onFinish?.();
      }, holdDuration);

      return () => clearTimeout(timeout);
    }
  }, [progress, onFinish, holdDuration]);

  useEffect(() => {
    if(progress <= 20) {
      setFlipBackground("muted-bg")
    } else if(progress <= 40) {
      setFlipBackground("burgundy-bg")
    } else if( progress <= 60) {
      setFlipBackground("softGreen-bg")        
    } else if(progress <= 80){
      setFlipBackground("accent-bg")
    } else if( progress <= 100){
      setFlipBackground("dark-bg")
    }
    
  }, [progress])

  const digits = String(progress).padStart(3, "-").split("");

  console.log(progress)
  return (
    <AnimatePresence>
      {(progress < 100 || isHolding) && (
        <motion.div
          className={`flip-counter 
            ${isHolding ? "pulse" : ""}
            ${flipBackground}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          data-cursor="hover"
        >
          {digits.map((digit, index) => (
            <FlipDigit
              key={index}
              digit={digit}
              duration={animationDuration}
              color={flipBackground}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
