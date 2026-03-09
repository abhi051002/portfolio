import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Animated grid + floating orbs background
const HeroBgAnimation = () => {
  const containerRef = useRef(null);
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const orbRef3 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating orbs animation with GSAP
      gsap.to(orbRef1.current, {
        x: 40,
        y: -30,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to(orbRef2.current, {
        x: -30,
        y: 40,
        duration: 10,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      gsap.to(orbRef3.current, {
        x: 20,
        y: 25,
        duration: 12,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Line grid overlay */}
      <div className="absolute inset-0 line-grid opacity-30" />

      {/* Gradient glow orbs */}
      <div
        ref={orbRef1}
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={orbRef2}
        className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={orbRef3}
        className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Horizontal accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed 30%, #06b6d4 70%, transparent)' }}
      />
    </div>
  );
};

export default HeroBgAnimation;