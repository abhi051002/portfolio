"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Canvas Particle Matrix ───────────────────────────────────────────────────
const MatrixCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let frame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Floating particles with connections
    const NUM = 100;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: Math.random() > 0.6 ? "124,58,237" : Math.random() > 0.5 ? "6,182,212" : "168,85,247",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},0.7)`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />;
};

// ─── Typed text hook ─────────────────────────────────────────────────────────
const useTyped = (lines, { speed = 45 } = {}) => {
  const [display, setDisplay] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let li = 0;
    let ci = 0;
    setDisplay([]);
    setDone(false);

    const tick = () => {
      if (li >= lines.length) { setDone(true); return; }
      const line = lines[li];
      ci++;
      setDisplay((prev) => {
        const next = [...prev];
        next[li] = line.slice(0, ci);
        return next;
      });
      if (ci < line.length) {
        setTimeout(tick, speed);
      } else {
        li++; ci = 0;
        setTimeout(tick, speed * 6);
      }
    };
    setTimeout(tick, 600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { display, done };
};

// ─── Main preloader ───────────────────────────────────────────────────────────
const BOOT_LINES = [
  "> Initializing portfolio.exe...",
  "> Loading assets & skills...",
  "> Mounting experience modules...",
  "> Compiling projects...",
  "> All systems nominal. Launching. 🚀",
];

const NAME_CHARS = "ABHIJIT NANDA".split("");

export default function BootScreenPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const { display: typedLines, done: typedDone } = useTyped(
    showTerminal ? BOOT_LINES : [],
    { speed: 28 }
  );

  // Orchestrate the reveal sequence
  useEffect(() => {
    const t1 = setTimeout(() => setShowName(true), 300);
    const t2 = setTimeout(() => setShowTerminal(true), 1100);
    const t3 = setTimeout(() => setShowBar(true), 1300);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  // Progress bar
  useEffect(() => {
    if (!showBar) return;
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 4 + 1.5;
      if (v >= 100) { v = 100; clearInterval(id); }
      setProgress(Math.min(v, 100));
    }, 60);
    return () => clearInterval(id);
  }, [showBar]);

  // When typing + progress done → exit
  useEffect(() => {
    if (typedDone && progress >= 100) {
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 900);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [typedDone, progress, onComplete]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Particle background */}
          <MatrixCanvas />

          {/* Glow orbs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-700/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xl px-6">

            {/* ── Animated logo icon ── */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
              className="relative"
            >
              {/* Outer spinning ring */}
              <div className="absolute -inset-3 rounded-full border border-violet-500/30 animate-spin-slow" />
              {/* Glow pulse ring */}
              <div className="absolute -inset-1 rounded-full bg-violet-600/20 animate-pulse" />
              {/* Inner hexagon logo */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/40">
                <span className="text-white font-black text-3xl select-none">AN</span>
              </div>
            </motion.div>

            {/* ── Name letters flying in ── */}
            <AnimatePresence>
              {showName && (
                <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap justify-center">
                  {NAME_CHARS.map((char, i) =>
                    char === " " ? (
                      <span key={i} className="w-3 sm:w-4" />
                    ) : (
                      <motion.span
                        key={i}
                        className="text-3xl sm:text-5xl font-black tracking-tight"
                        style={{
                          background: "linear-gradient(135deg, #7c3aed, #a855f7, #06b6d4)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        initial={{ opacity: 0, y: -40, rotateX: 90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          delay: i * 0.055,
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {char}
                      </motion.span>
                    )
                  )}
                </div>
              )}
            </AnimatePresence>

            {/* ── Terminal lines ── */}
            <AnimatePresence>
              {showTerminal && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full bg-black/40 border border-white/8 rounded-xl p-4 font-mono text-xs sm:text-sm backdrop-blur-sm"
                >
                  {/* Terminal top bar */}
                  <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="text-slate-500 text-xs ml-2">portfolio.exe</span>
                  </div>

                  {/* Typed lines */}
                  <div className="flex flex-col gap-1.5 min-h-[100px]">
                    {BOOT_LINES.map((line, i) => {
                      const shown = typedLines[i];
                      if (!shown) return null;
                      const isLast = i === BOOT_LINES.length - 1;
                      return (
                        <div
                          key={i}
                          className={`${isLast ? "text-green-400" : i === typedLines.length - 1 ? "text-violet-300" : "text-slate-400"
                            }`}
                        >
                          {shown}
                          {/* Blinking cursor on the current line */}
                          {i === typedLines.length - 1 && !typedDone && (
                            <span className="inline-block w-1.5 h-3.5 bg-violet-400 ml-0.5 align-middle animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Progress bar ── */}
            <AnimatePresence>
              {showBar && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="flex justify-between mb-1.5 text-xs text-slate-500 font-mono">
                    <span>Loading</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-400 relative"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut", duration: 0.1 }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}