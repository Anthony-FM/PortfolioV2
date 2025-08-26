import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";

export default function CustomCursor() {
  // Position du curseur avec MotionValues
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ajout d'un effet spring pour un mouvement plus fluide
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  // Contrôleur pour gérer les variantes
  const controls = useAnimation();

  useEffect(() => {
    const moveCursor = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const element = document.elementFromPoint(e.clientX, e.clientY);

      if (element?.dataset?.cursor === "hover") {
        controls.start("hover");
      } else {
        controls.start("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [x, y, controls]);

  // Variantes du curseur
  const variants = {
    default: {
      width: 20,
      height: 20,
      opacity: 0.3,
      border: "1px solid #F0A202",
      backgroundColor: "transparent",
      transition: { type: "spring", stiffness: 200, damping: 15 }
    },
    hover: {
      width: 64,
      height: 64,
      opacity: 1,
      border: "3px solid #F0A202",
      backgroundColor: "transparent",
      transition: { type: "spring", stiffness: 200, damping: 15 }
    }
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "exclusion"
      }}
      variants={variants}
      animate={controls}
    />
  );
}
