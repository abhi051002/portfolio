import React, { useEffect, useRef } from "react";

/**
 * MouseBackground — fixed, full-page canvas that reacts to the mouse.
 *
 * Features:
 *  • Aurora radial spotlight that follows the cursor
 *  • 120 constellation particles with magnetic attraction/repulsion
 *  • Glowing comet trail
 *  • Spark burst on fast mouse movement
 */
const MouseBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    // ── Mouse state ──────────────────────────────────────────────────────────
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0 };
    const trail = [];
    const MAX_TRAIL = 30;

    // ── Resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // ── Mouse tracker ────────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      const px = mouse.x, py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - px;
      mouse.vy = mouse.y - py;
      trail.push({ x: mouse.x, y: mouse.y });
      if (trail.length > MAX_TRAIL) trail.shift();
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Particle ─────────────────────────────────────────────────────────────
    const PALETTE = [
      "124,58,237",   // violet
      "139,92,246",   // light violet
      "6,182,212",    // cyan
      "34,211,238",   // light cyan
      "167,139,250",  // lavender
    ];

    class Particle {
      constructor() { this.init(); }
      init() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.sz = Math.random() * 1.8 + 0.4;
        this.bsz = this.sz;         // base size
        this.sx = (Math.random() - 0.5) * 0.4;
        this.sy = (Math.random() - 0.5) * 0.4;
        this.vx = 0; this.vy = 0;
        this.a  = Math.random() * 0.5 + 0.15;
        this.col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      }
      update() {
        // Drift
        this.x += this.sx + this.vx;
        this.y += this.sy + this.vy;

        // Mouse magnetic field
        const dx   = mouse.x - this.x;
        const dy   = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const ATT  = 180, REP = 65;

        if (dist < ATT) {
          const f = (ATT - dist) / ATT;
          if (dist < REP) {
            // repel
            this.vx -= (dx / dist) * f * 2.8;
            this.vy -= (dy / dist) * f * 2.8;
            this.sz  = this.bsz * (1 + f * 3.5);
          } else {
            // attract gently
            this.vx += (dx / dist) * f * 0.6;
            this.vy += (dy / dist) * f * 0.6;
            this.sz  = this.bsz * (1 + f * 1.4);
          }
        } else {
          this.sz += (this.bsz - this.sz) * 0.08;
        }

        // Friction
        this.vx *= 0.87;
        this.vy *= 0.87;

        // Wrap / bounce
        if (this.x < 0 || this.x > canvas.width)  this.sx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.sy *= -1;
        this.x = Math.max(0, Math.min(canvas.width,  this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }
      draw() {
        const s = Math.max(0.1, this.sz);
        // ambient glow halo when near cursor
        if (this.sz > this.bsz * 1.6) {
          const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, s * 5);
          g.addColorStop(0, `rgba(${this.col},${this.a * 0.9})`);
          g.addColorStop(1, `rgba(${this.col},0)`);
          ctx.beginPath();
          ctx.arc(this.x, this.y, s * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.col},${this.a})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 120 }, () => new Particle());

    // ── Connections ──────────────────────────────────────────────────────────
    const drawConnections = () => {
      const D = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < D) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${0.13 * (1 - d / D)})`;
            ctx.lineWidth   = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // ── Aurora spotlight ─────────────────────────────────────────────────────
    const drawAurora = () => {
      if (mouse.x === -9999) return;
      const mx = mouse.x, my = mouse.y;

      // large soft halo
      const g1 = ctx.createRadialGradient(mx, my, 0, mx, my, 380);
      g1.addColorStop(0,   "rgba(124,58,237,0.13)");
      g1.addColorStop(0.45,"rgba(6,182,212,0.06)");
      g1.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(mx, my, 380, 0, Math.PI * 2);
      ctx.fillStyle = g1;
      ctx.fill();

      // sharp inner ring
      const g2 = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
      g2.addColorStop(0,   "rgba(139,92,246,0.06)");
      g2.addColorStop(0.65,"rgba(139,92,246,0.22)");
      g2.addColorStop(1,   "rgba(139,92,246,0)");
      ctx.beginPath();
      ctx.arc(mx, my, 90, 0, Math.PI * 2);
      ctx.fillStyle = g2;
      ctx.fill();
    };

    // ── Comet trail ──────────────────────────────────────────────────────────
    const drawTrail = () => {
      if (trail.length < 2) return;
      for (let i = 1; i < trail.length; i++) {
        const t  = i / trail.length;
        const p0 = trail[i - 1];
        const p1 = trail[i];
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `rgba(139,92,246,${t * 0.6})`;
        ctx.lineWidth   = t * 4;
        ctx.lineCap     = "round";
        ctx.stroke();
      }
      // bright orb at tip
      const tip = trail[trail.length - 1];
      const fg  = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 20);
      fg.addColorStop(0,   "rgba(216,180,254,0.95)");
      fg.addColorStop(0.45,"rgba(139,92,246,0.55)");
      fg.addColorStop(1,   "rgba(139,92,246,0)");
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = fg;
      ctx.fill();
    };

    // ── Sparks ───────────────────────────────────────────────────────────────
    const sparks = [];
    const SPARK_COLS = ["192,132,252","139,92,246","6,182,212","34,211,238"];

    class Spark {
      constructor() {
        this.x  = mouse.x;
        this.y  = mouse.y;
        this.vx = -mouse.vx * 0.35 + (Math.random() - 0.5) * 4;
        this.vy = -mouse.vy * 0.35 + (Math.random() - 0.5) * 4;
        this.life  = 1;
        this.decay = Math.random() * 0.04 + 0.022;
        this.sz    = Math.random() * 2.8 + 0.6;
        this.col   = SPARK_COLS[Math.floor(Math.random() * SPARK_COLS.length)];
      }
      update() {
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += 0.07;
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.life -= this.decay;
      }
      draw() {
        if (this.life <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz * this.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.col},${this.life})`;
        ctx.fill();
      }
    }

    // ── Main loop ────────────────────────────────────────────────────────────
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawAurora();
      drawConnections();
      particles.forEach((p) => { p.update(); p.draw(); });

      // spawn sparks on fast movement
      const spd = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2);
      if (spd > 7 && mouse.x !== -9999) {
        const n = Math.min(Math.floor(spd / 3), 7);
        for (let i = 0; i < n; i++) sparks.push(new Spark());
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].life <= 0) sparks.splice(i, 1);
      }

      drawTrail();
      animationId = requestAnimationFrame(animate);
    };
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
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default MouseBackground;
