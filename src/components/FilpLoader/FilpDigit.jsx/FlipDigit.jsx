import { useEffect, useState } from "react";

/**
 * @typedef {Object} FlipDigitProps
 * @property {string | number} digit - Le chiffre actuel à afficher avec animation.
 * @property {number} duration - Durée de l'animation en millisecondes.
 */

/**
 * Composant chiffre avec animation flip fluide.
 */
export default function FlipDigit({ digit, duration, color }) {
  const [prev, setPrev] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  let [ digitColor, setDigitColor] = useState("")

  useEffect(() => {
    if (digit !== prev) {
      setIsFlipping(true);

      const timeout = setTimeout(() => {
        setPrev(digit);
        setIsFlipping(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [digit, prev, duration]);
  
  useEffect(() => {
    if(color === "muted-bg")  setDigitColor("dark-color") 
    if(color ==="burgundy-bg")  setDigitColor("burgundy-color") 
    if(color ==="softGreen-bg")  setDigitColor("softGreen-color")  
    if(color ==="accent-bg")  setDigitColor("burgundy-color") 
    if(color ==="dark-bg")  setDigitColor("dark-color") 
  }, [color])

  return (
    <div className={`flip-digit ${digitColor}`}>
      {/* Le chiffre précédent reste visible derrière */}
      <div className={`digit-static `}>{prev}</div>

      {/* L'animation se fait par-dessus */}
      {isFlipping && (
        <div className="flip-animation">
          <div className={`flip-top ${digitColor}`}>{prev}</div>
          <div className={`flip-bottom  ${digitColor}`}>{digit}</div>
        </div>
      )}
    </div>
  );
}
