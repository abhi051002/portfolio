"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Canvas Particle Network ─────────────────────────────────────────────────
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

    const NUM = 90;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: Math.random() > 0.6 ? "124,58,237" : Math.random() > 0.5 ? "6,182,212" : "168,85,247",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
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
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />;
};

// ─── Boot lines ───────────────────────────────────────────────────────────────
const BOOT_LINES = [
  "> Initializing portfolio.exe...",
  "> Loading assets & skills...",
  "> Mounting experience modules...",
  "> Compiling projects...",
  "> All systems nominal. Launching 🚀",
];

const TOTAL_CHARS = BOOT_LINES.reduce((sum, line) => sum + line.length, 0);

const NAME_CHARS = "ABHIJIT NANDA".split("");

// ─── Main Preloader ───────────────────────────────────────────────────────────
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [typedDone, setTypedDone] = useState(false);
  const typingRef = useRef(null);

  // Sequence orchestration
  useEffect(() => {
    const t1 = setTimeout(() => setShowName(true), 300);
    const t2 = setTimeout(() => setShowTerminal(true), 1100);
    const t3 = setTimeout(() => setShowBar(true), 1300);
    // Start typing after terminal appears
    const t4 = setTimeout(() => startTyping(), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTyping = () => {
    let li = 0;
    let ci = 0;
    let totalTyped = 0;
    const SPEED = 28;

    const tick = () => {
      if (li >= BOOT_LINES.length) {
        setProgress(100);
        setTypedDone(true);
        return;
      }
      const line = BOOT_LINES[li];
      ci++;
      totalTyped++;
      // Update progress based on how many characters have been typed
      setProgress(Math.round((totalTyped / TOTAL_CHARS) * 100));
      setTypedLines((prev) => {
        const next = [...prev];
        next[li] = line.slice(0, ci);
        return next;
      });
      if (ci < line.length) {
        typingRef.current = setTimeout(tick, SPEED);
      } else {
        li++; ci = 0;
        typingRef.current = setTimeout(tick, SPEED * 8);
      }
    };
    tickRef.current = tick;
    typingRef.current = setTimeout(tick, 0);
  };

  const tickRef = useRef(null);

  // Exit when both typing and progress done
  useEffect(() => {
    if (typedDone && progress >= 100) {
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(() => { if (onComplete) onComplete(); }, 900);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [typedDone, progress, onComplete]);

  // Cleanup typing on unmount
  useEffect(() => {
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Particle canvas */}
          <MatrixCanvas />

          {/* Ambient glow orbs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-700/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xl px-6">

            {/* ── Logo badge ── */}
            <motion.div
              initial={{ scale: 0, rotate: -120, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.1 }}
              className="relative flex items-center justify-center"
            >
              {/* Outermost slow-spinning ring */}
              <div
                className="absolute rounded-full border border-cyan-400/20"
                style={{ width: 148, height: 148, animation: "spin 12s linear infinite" }}
              />
              {/* Mid ring with dashes */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 128,
                  height: 128,
                  border: "1px dashed rgba(168,85,247,0.35)",
                  animation: "spin 8s linear infinite reverse",
                }}
              />
              {/* Glow aura pulse */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 110,
                  height: 110,
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(0,245,255,0.08) 60%, transparent 80%)",
                  animation: "pulse 2.5s ease-in-out infinite",
                }}
              />
              {/* SVG Logo */}
              <motion.img
                src={`${process.env.PUBLIC_URL}/logo.svg`}
                alt="AN Logo"
                style={{ width: 96, height: 96, filter: "drop-shadow(0 0 18px rgba(168,85,247,0.7)) drop-shadow(0 0 6px rgba(0,245,255,0.5))" }}
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* ── Name letters fly-in ── */}
            {showName && (
              <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap justify-center">
                {NAME_CHARS.map((char, i) =>
                  char === " " ? (
                    <span key={i} className="w-3 sm:w-4" />
                  ) : (
                    <motion.span
                      key={i}
                      className="text-3xl sm:text-5xl font-black"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #a855f7, #06b6d4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                      initial={{ opacity: 0, y: -40, rotateX: 90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: i * 0.055, type: "spring", stiffness: 280, damping: 20 }}
                    >
                      {char}
                    </motion.span>
                  )
                )}
              </div>
            )}

            {/* ── Terminal window ── */}
            {showTerminal && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-black/40 border border-white/8 rounded-xl p-4 font-mono text-xs sm:text-sm backdrop-blur-sm"
              >
                {/* Title bar */}
                <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="text-slate-500 text-xs ml-2">portfolio.exe — zsh</span>
                </div>
                {/* Typed lines */}
                <div className="flex flex-col gap-1.5 min-h-[108px]">
                  {BOOT_LINES.map((_, i) => {
                    const shown = typedLines[i];
                    if (!shown) return null;
                    const isLast = i === BOOT_LINES.length - 1;
                    const isCurrent = i === typedLines.length - 1 && !typedDone;
                    return (
                      <div
                        key={i}
                        className={isLast ? "text-green-400" : isCurrent ? "text-violet-300" : "text-slate-400"}
                      >
                        {shown}
                        {isCurrent && (
                          <span className="inline-block w-1.5 h-3.5 bg-violet-400 ml-0.5 align-middle animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Progress bar ── */}
            {showBar && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="flex justify-between mb-1.5 text-xs text-slate-500 font-mono">
                  <span>Loading</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full relative overflow-hidden transition-all duration-100"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s linear infinite",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
