import { useEffect, useRef } from 'react';

const GrainOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const imageData = ctx.createImageData(width, height);
    const buffer32 = new Uint32Array(imageData.data.buffer);

    const random = () => Math.random() * 255;

    const draw = () => {
      for (let i = 0; i < buffer32.length; i++) {
        const gray = random() | 0;
        buffer32[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray; // RGBA
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0.06,
        mixBlendMode: 'hard-light'
      }}
    />
  );
};

export default GrainOverlay;
