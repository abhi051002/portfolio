import React, { useEffect, useRef } from "react";

const HeroBgAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    // Mouse state
    const mouse = {
      x: -9999,
      y: -9999,
      px: -9999, // previous x
      py: -9999, // previous y
      vx: 0,    // velocity x
      vy: 0,    // velocity y
    };

    // Trail history for comet effect
    const trail = [];
    const MAX_TRAIL = 28;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Mouse move listener — track on the parent element (whole page)
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.vx = mouse.x - mouse.px;
      mouse.vy = mouse.y - mouse.py;

      trail.push({ x: mouse.x, y: mouse.y, age: 0 });
      if (trail.length > MAX_TRAIL) trail.shift();
    };

    window.addEventListener("mousemove", onMouseMove);

    // ─── Particle Class ────────────────────────────────────────────────────────
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.ox = this.x; // origin x
        this.oy = this.y; // origin y
        this.size = Math.random() * 2.2 + 0.4;
        this.baseSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.speedY = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.55 + 0.15;
        // pick a palette: violet, cyan, or white-ish
        const palette = [
          "124,58,237",   // violet
          "139,92,246",   // lighter violet
          "6,182,212",    // cyan
          "34,211,238",   // lighter cyan
          "192,192,255",  // lavender-white
        ];
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.vx = 0;
        this.vy = 0;
      }
      update() {
        // Drift naturally
        this.x += this.speedX + this.vx;
        this.y += this.speedY + this.vy;

        // Magnetic mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ATTRACT_RADIUS = 160;
        const REPEL_RADIUS  = 60;

        if (dist < ATTRACT_RADIUS && dist > 0) {
          const force = (ATTRACT_RADIUS - dist) / ATTRACT_RADIUS;
          if (dist < REPEL_RADIUS) {
            // Push away strongly
            this.vx -= (dx / dist) * force * 2.5;
            this.vy -= (dy / dist) * force * 2.5;
            this.size = this.baseSize * (1 + force * 3);
            this.opacity = Math.min(1, this.opacity + force * 0.6);
          } else {
            // Gently attract
            this.vx += (dx / dist) * force * 0.7;
            this.vy += (dy / dist) * force * 0.7;
            this.size = this.baseSize * (1 + force * 1.2);
          }
        } else {
          // Spring back to natural
          this.size += (this.baseSize - this.size) * 0.08;
        }

        // Dampen velocity (friction)
        this.vx *= 0.88;
        this.vy *= 0.88;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        this.x = Math.max(0, Math.min(canvas.width,  this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }
      draw() {
        // Glow halo
        if (this.size > this.baseSize * 1.5) {
          const grd = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 4
          );
          grd.addColorStop(0, `rgba(${this.color},${this.opacity * 0.8})`);
          grd.addColorStop(1, `rgba(${this.color},0)`);
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
        // Core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
      }
    }

    // ─── Spawn particles ───────────────────────────────────────────────────────
    for (let i = 0; i < 110; i++) particles.push(new Particle());

    // ─── Connections between nearby particles ──────────────────────────────────
    const drawConnections = () => {
      const CONN_DIST = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIST) {
            const alpha = 0.12 * (1 - dist / CONN_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // ─── Aurora spotlight that follows the mouse ───────────────────────────────
    const drawSpotlight = () => {
      if (mouse.x === -9999) return;

      // Outer soft aurora
      const AURORA_R = 320;
      const auroraGrd = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, AURORA_R
      );
      auroraGrd.addColorStop(0,   "rgba(124,58,237,0.12)");
      auroraGrd.addColorStop(0.4, "rgba(6,182,212,0.07)");
      auroraGrd.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, AURORA_R, 0, Math.PI * 2);
      ctx.fillStyle = auroraGrd;
      ctx.fill();

      // Inner sharp spotlight ring
      const ringGrd = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 80
      );
      ringGrd.addColorStop(0,   "rgba(139,92,246,0.09)");
      ringGrd.addColorStop(0.6, "rgba(139,92,246,0.18)");
      ringGrd.addColorStop(0.9, "rgba(139,92,246,0.04)");
      ringGrd.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
      ctx.fillStyle = ringGrd;
      ctx.fill();
    };

    // ─── Mouse comet trail ─────────────────────────────────────────────────────
    const drawTrail = () => {
      if (trail.length < 2) return;
      for (let i = 1; i < trail.length; i++) {
        const t   = i / trail.length;
        const pt  = trail[i - 1];
        const cur = trail[i];
        const alpha = t * 0.55;
        const width = t * 3.5;
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(cur.x, cur.y);
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
        ctx.lineWidth   = width;
        ctx.lineCap     = "round";
        ctx.stroke();
      }

      // Bright orb at cursor tip
      const tip = trail[trail.length - 1];
      const orbGrd = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 18);
      orbGrd.addColorStop(0,   "rgba(192,132,252,0.9)");
      orbGrd.addColorStop(0.4, "rgba(139,92,246,0.5)");
      orbGrd.addColorStop(1,   "rgba(139,92,246,0)");
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = orbGrd;
      ctx.fill();
    };

    // ─── Sparks spawned by fast mouse movement ─────────────────────────────────
    const sparks = [];
    class Spark {
      constructor(x, y, vx, vy) {
        this.x  = x;
        this.y  = y;
        this.vx = vx + (Math.random() - 0.5) * 3;
        this.vy = vy + (Math.random() - 0.5) * 3;
        this.life = 1.0;
        this.decay = Math.random() * 0.04 + 0.025;
        this.size  = Math.random() * 2.5 + 0.8;
        const cols = ["192,132,252", "139,92,246", "6,182,212", "34,211,238"];
        this.color = cols[Math.floor(Math.random() * cols.length)];
      }
      update() {
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += 0.06; // slight gravity
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.life -= this.decay;
      }
      draw() {
        if (this.life <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.life * 0.9})`;
        ctx.fill();
      }
    }

    const spawnSparks = () => {
      const speed = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2);
      if (speed > 6 && mouse.x !== -9999) {
        const count = Math.min(Math.floor(speed / 3), 6);
        for (let i = 0; i < count; i++) {
          sparks.push(new Spark(mouse.x, mouse.y, -mouse.vx * 0.3, -mouse.vy * 0.3));
        }
      }
    };

    // ─── Main animation loop ───────────────────────────────────────────────────
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spotlight aurora (behind everything)
      drawSpotlight();

      // Connections
      drawConnections();

      // Particles
      particles.forEach((p) => { p.update(); p.draw(); });

      // Sparks
      spawnSparks();
      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].life <= 0) sparks.splice(i, 1);
      }

      // Comet trail (on top)
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
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default HeroBgAnimation;