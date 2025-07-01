import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element?.dataset?.cursor === "hover") {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        transform: "translate(-50%, -50%)",
        width: variant === "hover" ? "4rem" : "10px",
        height: variant === "hover" ? "4rem" : "10px",
        borderRadius: "50%",
        background: variant === "hover" ? "#F0A202" : "#F0A202",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: variant === "hover" ? "1" : "0.3",
        mixBlendMode: "exclusion",
        transition: "all 0.3s ease"
      }}
    />
  );
}
