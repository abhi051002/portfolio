import React from "react";

/**
 * HeroBgAnimation — subtle, elegant ambient background for the hero section.
 *
 * Uses pure CSS gradients and gentle floating orbs instead of heavy canvas
 * particle systems. GPU-accelerated and mobile-friendly.
 */
const HeroBgAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient orb — slow drift top-left */}
      <div
        className="hero-orb hero-orb-1"
        style={{
          position: "absolute",
          width: "40vw",
          height: "40vw",
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.05) 50%, transparent 75%)",
          filter: "blur(60px)",
          top: "-5%",
          left: "-5%",
          willChange: "transform",
        }}
      />
      {/* Secondary orb — slow drift bottom-right */}
      <div
        className="hero-orb hero-orb-2"
        style={{
          position: "absolute",
          width: "35vw",
          height: "35vw",
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 50%, transparent 75%)",
          filter: "blur(50px)",
          bottom: "5%",
          right: "-5%",
          willChange: "transform",
        }}
      />
      {/* Accent orb — floats center */}
      <div
        className="hero-orb hero-orb-3"
        style={{
          position: "absolute",
          width: "25vw",
          height: "25vw",
          maxWidth: 350,
          maxHeight: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(168,85,247,0.03) 50%, transparent 75%)",
          filter: "blur(40px)",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          willChange: "transform",
        }}
      />
      {/* Subtle mesh grid overlay for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />
    </div>
  );
};

export default HeroBgAnimation;