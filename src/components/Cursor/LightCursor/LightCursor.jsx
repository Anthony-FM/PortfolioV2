import { useEffect, useState } from "react";

export default function LightCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(194, 44, 44, 0.2) 10%, transparent 80px)`,
        mixBlendMode: "screen"
      }}
    />
  );
}
