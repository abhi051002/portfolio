import React, { useEffect, useRef } from "react";

/**
 * MouseBackground — A subtle, professional soft spotlight that follows the cursor.
 */
const MouseBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    let mouse = { x: -9999, y: -9999 };
    // Smooth cursor interpolation
    let target = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const onMouseMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (mouse.x === -9999) {
        // Initialize immediately on first move
        mouse.x = target.x;
        mouse.y = target.y;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate towards target for smooth, elegant movement
      if (target.x !== -9999) {
        mouse.x += (target.x - mouse.x) * 0.12;
        mouse.y += (target.y - mouse.y) * 0.12;

        // Draw soft double spotlight
        const radius = 600; // Large, very soft radius
        
        // Inner subtle glow
        const innerRadius = 200;
        const innerGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, innerRadius
        );
        innerGradient.addColorStop(0, "rgba(124, 58, 237, 0.07)"); // Violet
        innerGradient.addColorStop(1, "rgba(124, 58, 237, 0)");

        ctx.fillStyle = innerGradient;
        ctx.fillRect(max(0, mouse.x - innerRadius), max(0, mouse.y - innerRadius), innerRadius*2, innerRadius*2);
        
        // Outer large ambient glow
        const outerGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, radius
        );
        outerGradient.addColorStop(0, "rgba(255, 255, 255, 0.03)"); // Very subtle white
        outerGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = outerGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationId = requestAnimationFrame(animate);
    };
    
    // Helper for rect clipping
    const max = Math.max;

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        background: "transparent",
      }}
    />
  );
};

export default MouseBackground;
