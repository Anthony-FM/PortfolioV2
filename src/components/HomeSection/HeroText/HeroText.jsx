import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

function HeroText({ transformScale }) {
  const [isZooming, setIsZooming] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(transformScale, "change", (currentScale) => {
    setIsZooming(currentScale >= 10);
  });

  // Détecte si une lettre est survolée
  useEffect(() => {
    const handleMove = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isLetterHovered = el?.dataset?.cursor === "hover";
      setIsVisible(isLetterHovered);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const text = `Développeur Frontend`;
  const textBottom = `Javascript - React`;

  const up = text.split("").map((t, index) => (
    <div
      className={`letter--${index + 1}`}
      key={`letter-${index}`}
      data-cursor="hover"
    >
      {t === " " ? "\u00A0" : t}
    </div>
  ));

  const down = textBottom.split("").map((t, index) => (
    <div
      className={`letter--${index + 19}`}
      key={`letter-${index}`}
      data-cursor="hover"
    >
      {t === " " ? "\u00A0" : t}
    </div>
  ));

  return (
    <div
      className={`lettersContainer mulish ${isZooming ? "disappear" : "appear"}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <FontAwesomeIcon
        icon={faArrowAltCircleRight}
        className={`letter--1`}
        data-cursor="hover"
      />
      <div 
        className="lettersContainer_container"
        data-cursor="hover">
        <div>{up}</div>
        <div>{down}</div>
      </div>
    </div>
  );
}

export default HeroText;
