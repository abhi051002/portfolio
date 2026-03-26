import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ─────────────────────────────────────────────
//  Unique features:
//   #2 Real SSE streaming from Ollama backend
//   #3 Smart thinking status while loading
//   #7 Persist chat to localStorage
//   #8 "Surprise Me" button
//   #9 Attention-grabbing notification bubble on page load
// ─────────────────────────────────────────────

const LS_KEY = "abhi-chat-messages";
const LS_NOTIF_KEY = "abhi-notif-dismissed";

const INITIAL_MESSAGE = {
  role: "ai",
  content: "Hey! 👋 I'm Abhi's AI — ask me anything about his work, skills, or projects.",
};

const SUGGESTIONS = [
  "Why should we hire him?",
  "Where did Abhijit work recently?",
  "What tech stack does he use?",
  "Tell me about his projects",
  "What's his educational background?",
  "How can I contact him?",
];

// #8 — Surprise Me question pool
const SURPRISE_QUESTIONS = [
  "What's his most challenging project ever?",
  "What technologies does Abhijit use?",
  "What makes him stand out from other developers?",
  "What's his biggest career achievement so far?",
  "Which technology is he most passionate about?",
  "What kind of problems does he love solving?",
  "Walk me through his career journey",
  "What would make him the perfect hire?",
  "What's a project he built from scratch?",
  "How does his experience across companies connect?",
  "What soft skills set him apart?",
  "What's his most impressive technical skill?",
  "What industries has he worked across?",
];

// #3 — Thinking status messages
const THINKING_PHASES = [
  "Recalling experience…",
  "Scanning projects…",
  "Checking skills…",
  "Crafting response…",
  "Finalising answer…",
];

// #9 — Rotating teaser messages in the notification bubble
const TEASER_MESSAGES = [
  { emoji: "👀", text: "Psst — want to know if Abhijit is a good hire?" },
  { emoji: "🚀", text: "Ask me about Abhijit's coolest projects!" },
  { emoji: "💡", text: "Curious what tech stack he uses?" },
  { emoji: "🤝", text: "I can connect you with Abhijit instantly!" },
  { emoji: "⚡", text: "Get answers about Abhijit in seconds." },
];

/* ── Icons ── */
const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconMaximize = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const IconMinimize = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" />
    <line x1="10" y1="14" x2="3" y2="21" /><line x1="21" y1="3" x2="14" y2="10" />
  </svg>
);
const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const IconCopy = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSparkle = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);
const IconArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Keyframes injected once ── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');

  .aichat-root * { font-family: 'Outfit', sans-serif; box-sizing: border-box; }

  @keyframes av-spin   { to { transform: rotate(360deg); } }
  @keyframes blink     { 0%,90%,100%{opacity:1} 95%{opacity:0.1} }
  @keyframes fab-pop   { from{transform:scale(0) rotate(-45deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }
  @keyframes fab-ring  { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.55);opacity:0} }
  @keyframes badge-pop { from{transform:scale(0)} to{transform:scale(1)} }
  @keyframes panel-in  { from{transform:scale(0.85) translateY(28px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
  @keyframes msg-in    { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes dot-bounce{ 0%,60%,100%{transform:translateY(0);opacity:.45} 30%{transform:translateY(-7px);opacity:1} }
  @keyframes cursor-blink{ 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes online-pulse{0%,100%{opacity:1} 50%{opacity:.4}}
  @keyframes tooltip-in{ from{transform:scale(0.85) translateY(8px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
  @keyframes status-fade{ 0%{opacity:0;transform:translateY(4px)} 20%,80%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-4px)} }

  /* greeting overlay */
  @keyframes greet-in  { from{opacity:0;transform:translateY(20px) scale(0.9)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes greet-out { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.9)} }
  @keyframes wave      { 0%,100%{transform:rotate(0deg) translateY(0)} 20%{transform:rotate(-20deg) translateY(-3px)} 40%{transform:rotate(16deg) translateY(-5px)} 60%{transform:rotate(-12deg) translateY(-3px)} 80%{transform:rotate(8deg) translateY(-2px)} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes sparkle   { 0%,100%{opacity:0;transform:scale(0) rotate(0)} 50%{opacity:1;transform:scale(1) rotate(180deg)} }
  @keyframes bounce-in { 0%{transform:scale(0)} 60%{transform:scale(1.15)} 80%{transform:scale(0.95)} 100%{transform:scale(1)} }
  @keyframes slide-up  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse-glow{ 0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,0.5)} 50%{box-shadow:0 0 0 10px rgba(124,58,237,0)} }

  /* #9 — Notification bubble animations */
  @keyframes notif-slide-in {
    0%  { opacity:0; transform: translateY(16px) scale(0.88); }
    65% { transform: translateY(-4px) scale(1.02); }
    100%{ opacity:1; transform: translateY(0) scale(1); }
  }
  @keyframes notif-slide-out {
    from{ opacity:1; transform: translateY(0) scale(1); }
    to  { opacity:0; transform: translateY(12px) scale(0.9); }
  }
  @keyframes notif-msg-swap {
    0%  { opacity:0; transform: translateY(6px); }
    100%{ opacity:1; transform: translateY(0); }
  }
  @keyframes notif-dot-ping {
    0%  { transform: scale(1); opacity: 1; }
    75%,100%{ transform: scale(2.2); opacity: 0; }
  }
  @keyframes notif-shimmer {
    0%  { background-position: -200% center; }
    100%{ background-position: 200% center; }
  }
  @keyframes notif-arrow-nudge {
    0%,100%{ transform: translateX(0); }
    50%    { transform: translateX(3px); }
  }
  @keyframes notif-glow-pulse {
    0%,100%{ box-shadow: 0 0 0 0 rgba(124,58,237,0.0), 0 8px 32px rgba(0,0,0,0.55); }
    50%    { box-shadow: 0 0 0 6px rgba(124,58,237,0.18), 0 8px 32px rgba(0,0,0,0.55); }
  }
  @keyframes notif-tail-wiggle {
    0%,100%{ transform: rotate(45deg) scale(1); }
    50%    { transform: rotate(45deg) scale(1.2); }
  }
  @keyframes shake {
    0%,100%{ transform:translateX(0); }
    20%    { transform:translateX(-4px); }
    40%    { transform:translateX(4px); }
    60%    { transform:translateX(-3px); }
    80%    { transform:translateX(3px); }
  }

  .antenna-dot { animation: blink 2.8s ease-in-out infinite; }
  .fab-ring-anim { animation: fab-ring 2.5s ease-out infinite; }
  .av-pulse-ring { animation: av-spin 3s linear infinite; opacity: 0.6; }
  .msg-in { animation: msg-in 0.22s ease; }
  .dot1 { animation: dot-bounce 1.3s infinite ease-in-out; }
  .dot2 { animation: dot-bounce 1.3s 0.18s infinite ease-in-out; }
  .dot3 { animation: dot-bounce 1.3s 0.36s infinite ease-in-out; }
  .stream-cursor { animation: cursor-blink 0.8s ease-in-out infinite; }
  .online-dot-anim { animation: online-pulse 2s ease-in-out infinite; }
  .fab-anim { animation: fab-pop 0.45s cubic-bezier(0.34,1.56,0.64,1); }
  .panel-anim { animation: panel-in 0.32s cubic-bezier(0.34,1.56,0.64,1); }
  .tooltip-anim { animation: tooltip-in 0.35s cubic-bezier(0.34,1.56,0.64,1); }
  .thinking-status-anim { animation: status-fade 2.2s ease-in-out forwards; }

  /* greeting mascot */
  .greet-in  { animation: greet-in  0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .greet-out { animation: greet-out 0.3s ease forwards; }
  .mascot-float { animation: float 3s ease-in-out infinite; }
  .wave-arm  { transform-origin: 80% 60%; animation: wave 1.5s ease-in-out 2; }
  .sparkle-1 { animation: sparkle 1.8s 0.2s ease-in-out infinite; }
  .sparkle-2 { animation: sparkle 1.8s 0.7s ease-in-out infinite; }
  .sparkle-3 { animation: sparkle 1.8s 1.2s ease-in-out infinite; }
  .greeting-bounce { animation: bounce-in 0.5s cubic-bezier(0.34,1.56,0.64,1); }
  .slide-up-1 { animation: slide-up 0.4s 0.2s ease both; }
  .slide-up-2 { animation: slide-up 0.4s 0.4s ease both; }

  /* #9 — notification */
  .notif-enter { animation: notif-slide-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .notif-exit  { animation: notif-slide-out 0.35s ease forwards; }
  .notif-msg-enter { animation: notif-msg-swap 0.3s ease forwards; }
  .notif-dot-ping  { animation: notif-dot-ping 1.4s cubic-bezier(0,0,0.2,1) infinite; }
  .notif-glow      { animation: notif-glow-pulse 2.5s ease-in-out infinite; }
  .notif-arrow     { animation: notif-arrow-nudge 1.2s ease-in-out infinite; }
  .notif-tail      { animation: notif-tail-wiggle 2s ease-in-out infinite; }
  .notif-shake     { animation: shake 0.5s ease; }

  .notif-shimmer-text {
    background: linear-gradient(90deg, #e0e7ff 0%, #a78bfa 40%, #67e8f9 60%, #e0e7ff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: notif-shimmer 2.8s linear infinite;
  }

  .scrollbar-custom::-webkit-scrollbar { width: 3px; }
  .scrollbar-custom::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 4px; }
  .scrollbar-custom { scrollbar-width: thin; scrollbar-color: rgba(124,58,237,0.25) transparent; }

  .chip-btn { transition: background 0.18s, border-color 0.18s, color 0.18s; }
  .chip-btn:hover { background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.6); color: #c4b5fd; }
  .surprise-chip { transition: background 0.18s, border-color 0.18s, color 0.18s; }
  .surprise-chip:hover { background: rgba(251,191,36,0.15); border-color: rgba(251,191,36,0.6); color: #fde68a; }
  .copy-btn-hover { opacity: 0; transition: opacity 0.15s; }
  .msg-body:hover .copy-btn-hover { opacity: 1; }
  .pulse-ring { animation: pulse-glow 2s ease-in-out infinite; }

  .notif-cta-btn:hover {
    background: rgba(124,58,237,0.35) !important;
    transform: scale(1.04);
  }

  /* Markdown body styles to override Tailwind reset */
  .aichat-md p { margin-bottom: 0.6em; }
  .aichat-md p:last-child { margin-bottom: 0; }
  .aichat-md ul { list-style-type: disc; margin-left: 1.5em; margin-bottom: 0.6em; }
  .aichat-md ol { list-style-type: decimal; margin-left: 1.5em; margin-bottom: 0.6em; }
  .aichat-md li { margin-bottom: 0.25em; padding-left: 0.25em; }
  
  .aichat-md h1, .aichat-md h2, .aichat-md h3, .aichat-md h4 { font-weight: 800; margin-top: 1em; margin-bottom: 0.5em; color: #0f172a; }
  .dark .aichat-md h1, .dark .aichat-md h2, .dark .aichat-md h3, .dark .aichat-md h4 { color: #fff; }
  .aichat-md h3 { font-size: 1.15em; }
  
  .aichat-md strong { font-weight: 700; color: #0f172a; }
  .dark .aichat-md strong { color: #fff; }
  
  .aichat-md a { color: #6366f1; text-decoration: underline; text-underline-offset: 4px; border-radius: 2px; transition: color 0.15s; }
  .dark .aichat-md a { color: #a5b4fc; }
  .aichat-md a:hover { color: #4f46e5; background: rgba(124,58,237,0.1); }
  .dark .aichat-md a:hover { color: #e0e7ff; background: rgba(124,58,237,0.2); }
`;

/* ── Bot Avatar ── */
const BotAvatar = ({ size = 28, pulse = false }) => (
  <div className="relative flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: size, height: size }}>
    {pulse && (
      <div className="absolute inset-[-3px] rounded-full z-[-1] av-pulse-ring" style={{
        background: "conic-gradient(from 0deg, #7c3aed, #3b82f6, #7c3aed)"
      }} />
    )}
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size }}>
      <circle cx="18" cy="18" r="18" fill="url(#av-bg)" />
      <rect x="8" y="14" width="20" height="14" rx="4" fill="url(#av-face)" />
      <rect x="13" y="8" width="10" height="7" rx="3" fill="url(#av-head)" />
      <line x1="18" y1="8" x2="18" y2="5" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="4" r="1.5" fill="#a78bfa" className="antenna-dot" />
      <circle cx="13.5" cy="20.5" r="2.5" fill="white" fillOpacity="0.9" />
      <circle cx="22.5" cy="20.5" r="2.5" fill="white" fillOpacity="0.9" />
      <circle cx="14.2" cy="21" r="1.2" fill="#7c3aed" />
      <circle cx="23.2" cy="21" r="1.2" fill="#7c3aed" />
      <rect x="13" y="26" width="10" height="1.5" rx="1" fill="white" fillOpacity="0.4" />
      <defs>
        <linearGradient id="av-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f1fbd" /><stop offset="1" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="av-face" x1="8" y1="14" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6d28d9" /><stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="av-head" x1="13" y1="8" x2="23" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

/* ── #9 Attention-Grabbing Notification Bubble ── */
const NotificationBubble = ({ onOpen, onDismiss }) => {
  const [phase, setPhase] = useState("enter");      // enter | idle | exit
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgAnim, setMsgAnim] = useState(true);
  const [shaking, setShaking] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Auto-dismiss after 12 s (unless hovered)
  useEffect(() => {
    const t = setTimeout(() => {
      if (!hovered) setPhase("exit");
    }, 12000);
    return () => clearTimeout(t);
  }, [hovered]);

  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(onDismiss, 380);
      return () => clearTimeout(t);
    }
  }, [phase, onDismiss]);

  // Rotate messages every 3.2 s
  useEffect(() => {
    const t = setInterval(() => {
      setMsgAnim(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % TEASER_MESSAGES.length);
        setMsgAnim(true);
      }, 180);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  // Shake the bubble every 5 s to re-grab attention
  useEffect(() => {
    const t = setInterval(() => {
      setShaking(true);
      setTimeout(() => setShaking(false), 550);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const msg = TEASER_MESSAGES[msgIndex];

  return (
    <div
      className={`
        fixed z-[999] bottom-[108px] right-[84px]
        ${phase === "enter" ? "notif-enter" : ""}
        ${phase === "exit" ? "notif-exit" : ""}
        ${shaking ? "notif-shake" : ""}
        notif-glow
      `}
      style={{ transformOrigin: "bottom right" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main bubble card */}
      <div
        className="relative rounded-[18px] overflow-hidden cursor-pointer select-none"
        style={{
          width: 248,
          background: "linear-gradient(145deg, rgba(15,10,35,0.97) 0%, rgba(20,14,48,0.97) 100%)",
          border: "1px solid rgba(124,58,237,0.45)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        onClick={() => { setPhase("exit"); onOpen(); }}
      >
        {/* Top shimmer bar */}
        <div style={{
          height: 2,
          background: "linear-gradient(90deg, transparent, #7c3aed, #3b82f6, #7c3aed, transparent)",
          backgroundSize: "200% auto",
          animation: "notif-shimmer 2s linear infinite",
        }} />

        {/* Body */}
        <div className="px-4 pt-3 pb-3.5">
          {/* Top row: live dot + label + close */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="notif-dot-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-emerald-400">
                AI Online
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setPhase("exit"); }}
              className="flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.06] border border-white/10 text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
              style={{ fontSize: 9, lineHeight: 1 }}
            >
              ✕
            </button>
          </div>

          {/* Rotating message */}
          <div className="flex items-start gap-2.5 mb-3">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-xl text-lg"
              style={{
                width: 38,
                height: 38,
                background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(59,130,246,0.2))",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
            >
              {msg.emoji}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div
                key={msgIndex}
                className={msgAnim ? "notif-msg-enter" : ""}
                style={{ opacity: msgAnim ? undefined : 0 }}
              >
                <p className="notif-shimmer-text m-0 text-[13px] font-bold leading-[1.4]">
                  {msg.text}
                </p>
              </div>
              <p className="m-0 mt-1 text-[11px] text-white/35 leading-tight">
                Powered by Abhi's personal AI
              </p>
            </div>
          </div>

          {/* CTA button */}
          <div
            className="notif-cta-btn flex items-center justify-between px-3.5 py-2.5 rounded-xl"
            style={{
              background: "rgba(124,58,237,0.2)",
              border: "1px solid rgba(124,58,237,0.4)",
            }}
          >
            <span className="text-[12.5px] font-bold text-violet-200">
              Ask me anything →
            </span>
            <span className="notif-arrow text-violet-400">
              <IconArrow />
            </span>
          </div>

          {/* Dots row - message index indicator */}
          <div className="flex items-center justify-center gap-1 mt-2.5">
            {TEASER_MESSAGES.map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === msgIndex ? 14 : 4,
                  height: 4,
                  borderRadius: 9999,
                  background: i === msgIndex ? "#7c3aed" : "rgba(255,255,255,0.15)",
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pointer tail toward FAB */}
      <div
        className="notif-tail absolute"
        style={{
          bottom: -6,
          right: 22,
          width: 12,
          height: 12,
          background: "rgba(20,14,48,0.97)",
          border: "1px solid rgba(124,58,237,0.45)",
          borderTop: "none",
          borderLeft: "none",
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
};

/* ── Greeting Mascot (shown on first open) ── */
const GreetingOverlay = ({ onDone }) => {
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const t = setTimeout(() => setPhase("out"), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "out") {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[22px] ${phase === "in" ? "greet-in" : "greet-out"}`}
      style={{ background: "linear-gradient(160deg, #0d0b22 0%, #0f172a 60%, #130f2e 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[22px] pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `sparkle ${1.5 + Math.random() * 2}s ${Math.random() * 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="mascot-float mb-4 greeting-bounce relative">
        <div className="sparkle-1 absolute -top-3 -right-2 text-yellow-300 text-lg pointer-events-none">✦</div>
        <div className="sparkle-2 absolute top-2 -left-4 text-violet-300 text-sm pointer-events-none">✦</div>
        <div className="sparkle-3 absolute -bottom-1 -right-4 text-blue-300 text-base pointer-events-none">✦</div>

        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="body-g" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6d28d9" /><stop offset="1" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="face-g" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#2563eb" />
            </linearGradient>
            <radialGradient id="glow-g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="55" r="38" fill="url(#glow-g)" />
          <rect x="28" y="46" width="44" height="36" rx="10" fill="url(#body-g)" />
          <rect x="22" y="18" width="56" height="36" rx="14" fill="url(#face-g)" />
          <line x1="50" y1="18" x2="50" y2="8" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="6" r="4" fill="#f0abfc" className="antenna-dot" />
          <ellipse cx="37" cy="33" rx="7" ry="7.5" fill="white" fillOpacity="0.95" />
          <ellipse cx="63" cy="33" rx="7" ry="7.5" fill="white" fillOpacity="0.95" />
          <circle cx="38.5" cy="34" r="4" fill="#4c1d95" />
          <circle cx="64.5" cy="34" r="4" fill="#4c1d95" />
          <circle cx="40" cy="32" r="1.5" fill="white" fillOpacity="0.9" />
          <circle cx="66" cy="32" r="1.5" fill="white" fillOpacity="0.9" />
          <path d="M38 44 Q50 52 62 44" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="28" cy="40" rx="5" ry="3" fill="#f9a8d4" fillOpacity="0.45" />
          <ellipse cx="72" cy="40" rx="5" ry="3" fill="#f9a8d4" fillOpacity="0.45" />
          <g className="wave-arm">
            <rect x="72" y="50" width="14" height="8" rx="4" fill="url(#body-g)" />
            <circle cx="86" cy="52" r="6" fill="#7c3aed" />
          </g>
          <rect x="14" y="50" width="14" height="8" rx="4" fill="url(#body-g)" />
          <rect x="32" y="78" width="14" height="8" rx="4" fill="#4f1fbd" />
          <rect x="54" y="78" width="14" height="8" rx="4" fill="#4f1fbd" />
          <rect x="38" y="54" width="24" height="14" rx="5" fill="rgba(255,255,255,0.12)" />
          <text x="50" y="64.5" textAnchor="middle" fontSize="7" fill="white" fontWeight="800" fontFamily="monospace">AI</text>
        </svg>
      </div>

      <div className="relative slide-up-1">
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 text-center shadow-2xl">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/10 border-l border-t border-white/20 rotate-45" />
          <p className="text-white font-bold text-lg leading-tight">Hey there! 👋</p>
          <p className="text-violet-200 text-sm mt-0.5 font-medium">I'm Abhi's AI assistant</p>
        </div>
      </div>

      <p className="text-white/40 text-xs mt-4 slide-up-2">Ask me anything about Abhijit →</p>
    </div>
  );
};

/* ── Streaming text / Markdown renderer ── */
const StreamingText = ({ text }) => (
  <div className="aichat-md">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {text}
    </ReactMarkdown>
  </div>
);

/* ── Message ── */
const Message = ({ role, content, streaming = false }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className={`msg-in flex gap-2 items-end ${role === "user" ? "flex-row-reverse" : ""}`}>
      {role === "ai" && <BotAvatar size={28} />}
      <div className={`msg-body flex flex-col gap-1 max-w-[80%] ${role === "user" ? "items-end" : "items-start"}`}>
        <div
          className={`px-3.5 py-2.5 text-[13.5px] leading-[1.55] break-words word-break
            ${role === "ai"
              ? "rounded-[18px] rounded-bl-[4px] text-slate-800 dark:text-[#d1d5f0] border border-violet-200 dark:border-violet-500/20 bg-violet-50 dark:bg-violet-500/10"
              : "rounded-[18px] rounded-br-[4px] text-white shadow-md bg-gradient-to-br from-violet-600 to-blue-600"
            }`}
        >
          {role === "ai" ? <StreamingText text={content} streaming={streaming} /> : content}
        </div>
        {role === "ai" && !streaming && (
          <button onClick={copy} title="Copy"
            className="copy-btn-hover flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-slate-200 dark:border-violet-500/20 text-slate-500 dark:text-white/30 text-[11px] cursor-pointer hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-violet-500/10 transition-colors">
            {copied ? <IconCheck /> : <IconCopy />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      {role === "user" && (
        <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-bold text-white/90 uppercase tracking-wider flex-shrink-0 bg-gradient-to-br from-blue-600 to-violet-700">
          you
        </div>
      )}
    </div>
  );
};

/* ── #3 Smart Thinking Indicator ── */
const ThinkingIndicator = ({ status }) => (
  <div className="flex gap-2 items-end">
    <BotAvatar size={28} />
    <div className="flex flex-col gap-1.5">
      <div className="px-4 py-3 rounded-[18px] rounded-bl-[4px] border border-violet-200 dark:border-violet-500/20 bg-violet-50 dark:bg-violet-500/10">
        <div className="flex items-center gap-2">
          <span className="dot1 w-[6px] h-[6px] rounded-full bg-violet-500 flex-shrink-0" />
          <span className="dot2 w-[6px] h-[6px] rounded-full bg-violet-400 flex-shrink-0" />
          <span className="dot3 w-[6px] h-[6px] rounded-full bg-violet-300 flex-shrink-0" />
          {status && (
            <span
              key={status}
              className="thinking-status-anim text-[11.5px] text-violet-600 dark:text-violet-300/80 ml-1 font-medium"
            >
              {status}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ── Header button ── */
const HBtn = ({ onClick, title, children }) => (
  <button onClick={onClick} title={title}
    className="flex items-center justify-center w-7 h-7 rounded-lg border-none bg-transparent text-slate-500 dark:text-white/50 cursor-pointer hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-[#e0e7ff] transition-colors">
    {children}
  </button>
);

/* ── #7 Persistence helpers ── */
const loadPersistedMessages = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
};

const persistMessages = (msgs) => {
  try {
    if (msgs.length <= 1) { localStorage.removeItem(LS_KEY); return; }
    localStorage.setItem(LS_KEY, JSON.stringify(msgs));
  } catch { /* storage full — ignore */ }
};

/* ── Main ── */
const AiChat = () => {
  const { portfolioId, backendUrl } = usePortfolio();

  const [messages, setMessages] = useState(() => {
    const saved = loadPersistedMessages();
    return saved || [INITIAL_MESSAGE];
  });

  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingId, setStreamingId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingShown, setGreetingShown] = useState(false);

  // #9 — notification bubble state
  const [showNotif, setShowNotif] = useState(false);
  const [notifDismissed, setNotifDismissed] = useState(
    () => !!sessionStorage.getItem(LS_NOTIF_KEY)
  );

  // #3 — thinking status
  const [thinkingStatus, setThinkingStatus] = useState("");
  const thinkingIntervalRef = useRef(null);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  // #7 — persist messages
  useEffect(() => { persistMessages(messages); }, [messages]);

  // #10 — listen for external open commands (e.g. from Navbar)
  useEffect(() => {
    const handleOpenChat = () => setOpen(true);
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => window.removeEventListener("open-ai-chat", handleOpenChat);
  }, []);

  // #9 — show notification bubble 2.5 s after mount (if not dismissed this session)
  useEffect(() => {
    if (notifDismissed || open) return;
    const t = setTimeout(() => setShowNotif(true), 1500);
    return () => clearTimeout(t);
  }, [open, notifDismissed]);

  const handleDismissNotif = useCallback(() => {
    setShowNotif(false);
    setNotifDismissed(true);
    sessionStorage.setItem(LS_NOTIF_KEY, "1");
  }, []);

  const handleNotifOpen = useCallback(() => {
    handleDismissNotif();
    setOpen(true);
  }, [handleDismissNotif]);

  useEffect(() => {
    if (open) {
      // Hide notif when chat opens
      if (showNotif) handleDismissNotif();
      if (!greetingShown) {
        setShowGreeting(true);
        setGreetingShown(true);
      }
      setTimeout(() => inputRef.current?.focus(), 220);
    }
  }, [open, showNotif, greetingShown, handleDismissNotif]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!showClearConfirm) return;
    const h = (e) => {
      if (!e.target.closest(".clear-confirm") && !e.target.closest(".h-btn"))
        setShowClearConfirm(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [showClearConfirm]);

  const startThinking = () => {
    let idx = 0;
    setThinkingStatus(THINKING_PHASES[0]);
    thinkingIntervalRef.current = setInterval(() => {
      idx = (idx + 1) % THINKING_PHASES.length;
      setThinkingStatus(THINKING_PHASES[idx]);
    }, 2200);
  };

  const stopThinking = () => {
    clearInterval(thinkingIntervalRef.current);
    setThinkingStatus("");
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem(LS_KEY);
    setShowClearConfirm(false);
    setInput("");
  };

  const surpriseMe = useCallback(() => {
    const q = SURPRISE_QUESTIONS[Math.floor(Math.random() * SURPRISE_QUESTIONS.length)];
    setInput(q);
    inputRef.current?.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);
    startThinking();

    const aiId = Date.now();
    setMessages((prev) => [...prev, { role: "ai", content: "", id: aiId }]);
    setStreamingId(aiId);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const history = messages
        .filter((m, idx) => !(m.role === "ai" && idx === 0))
        .map((m) => ({ role: m.role === "ai" ? "assistant" : "user", content: m.content }));

      const params = new URLSearchParams({
        message: msg,
        history: JSON.stringify(history),
      });

      const res = await fetch(`${backendUrl}/chat/${portfolioId}/stream?${params}`, {
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") break;
          if (payload.startsWith("[ERROR]")) throw new Error(payload.slice(8));

          try {
            const token = JSON.parse(payload);
            accumulated += token;
            const snap = accumulated;
            setMessages((prev) =>
              prev.map((m) => (m.id === aiId ? { ...m, content: snap } : m))
            );
          } catch { /* malformed chunk */ }
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId ? { ...m, content: "Sorry, something went wrong. Please try again." } : m
          )
        );
      }
    } finally {
      setStreamingId(null);
      setLoading(false);
      stopThinking();
    }
  }, [input, loading, messages, backendUrl, portfolioId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="aichat-root">
      <style>{STYLES}</style>

      {/* #9 — Attention-grabbing notification bubble */}
      {showNotif && !open && (
        <NotificationBubble
          onOpen={handleNotifOpen}
          onDismiss={handleDismissNotif}
        />
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI chat"
        className={`fab-anim pulse-ring fixed bottom-8 right-8 z-[1000] w-[60px] h-[60px] rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.08] text-white`}
        style={{
          background: open ? "linear-gradient(135deg,#1e1b4b,#1e3a8a)" : "linear-gradient(135deg,#4f1fbd 0%,#1e40af 100%)",
          boxShadow: "0 4px 20px rgba(79,31,189,0.55), 0 0 0 1px rgba(124,58,237,0.3)"
        }}
      >
        <span className="fab-ring-anim absolute inset-[-6px] rounded-full border-2 border-violet-500/40 pointer-events-none" />
        {open
          ? <IconClose />
          : <BotAvatar size={30} pulse />
        }
      </button>

      {/* Panel */}
      {open && (
        <div
          className={`panel-anim fixed z-[1000] flex flex-col overflow-hidden rounded-[22px] border border-violet-500/25 shadow-[0_16px_56px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_56px_rgba(0,0,0,0.6)] bg-white/95 dark:bg-[#0a081c]/95 backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${maximized ? "top-4 bottom-4 right-4 sm:top-8 sm:bottom-8 sm:right-8 w-[calc(100vw-32px)] sm:w-[700px] lg:w-[850px]" : "bottom-[108px] right-8 w-[375px] max-w-[calc(100vw-48px)] h-[530px] max-h-[calc(100vh-148px)]"}`}
          style={{ transformOrigin: "bottom right" }}
          role="dialog"
        >
          {showGreeting && <GreetingOverlay onDone={() => setShowGreeting(false)} />}

          {/* Header */}
          <div className="flex items-center gap-2.5 px-3.5 py-3.5 flex-shrink-0 border-b border-violet-500/20 bg-gradient-to-r from-violet-500/5 dark:from-violet-500/20 to-blue-500/5 dark:to-blue-500/10">
            <BotAvatar size={34} pulse />
            <div className="flex-1 min-w-0">
              <h4 className="m-0 text-[13.5px] font-bold text-slate-900 dark:text-[#e0e7ff] flex items-center gap-1.5">
                Ask Abhi
                <span className="text-[9px] font-extrabold tracking-[0.05em] px-1.5 py-0.5 rounded text-white uppercase" style={{ background: "linear-gradient(90deg,#7c3aed,#3b82f6)" }}>AI</span>
              </h4>
              <span className="text-[11px] text-slate-500 dark:text-[#6b7280] flex items-center gap-1.5">
                <span className="online-dot-anim w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {loading ? (
                  <span className="text-violet-400/80 transition-all">{thinkingStatus || "Thinking…"}</span>
                ) : "usually instant"}
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <div className="relative">
                <HBtn title="Clear chat" onClick={() => setShowClearConfirm((v) => !v)}>
                  <IconTrash />
                </HBtn>
                {showClearConfirm && (
                  <div className="clear-confirm absolute top-[calc(100%+8px)] right-0 w-44 rounded-xl p-3 z-[1100] shadow-xl tooltip-anim bg-white dark:bg-[#13102b] border border-violet-500/20 dark:border-violet-500/30">
                    <p className="m-0 mb-2.5 text-[12.5px] text-slate-700 dark:text-white/80">Clear conversation?</p>
                    <div className="flex gap-1.5">
                      <button onClick={clearChat} className="flex-1 py-1 rounded-lg text-xs font-semibold bg-red-600 text-white border-none cursor-pointer hover:opacity-80 transition-opacity">Clear</button>
                      <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-1 rounded-lg text-xs font-semibold border-none cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-white/70 bg-slate-100 dark:bg-white/5">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
              <HBtn title={maximized ? "Restore" : "Maximize"} onClick={() => setMaximized((v) => !v)}>
                {maximized ? <IconMinimize /> : <IconMaximize />}
              </HBtn>
              <HBtn title="Close" onClick={() => setOpen(false)}>
                <IconClose />
              </HBtn>
            </div>
          </div>

          {/* Pinned Try Asking Suggestions */}
          <div className="flex-shrink-0 px-3 py-2 border-b border-violet-500/10 bg-violet-50/50 dark:bg-violet-900/10 hidden sm:block">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-custom pb-0.5" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#4b5563] flex-shrink-0 mr-1 pl-0.5">Ask:</span>
              <button
                onClick={surpriseMe}
                className="surprise-chip flex-shrink-0 flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full cursor-pointer whitespace-nowrap text-amber-600 dark:text-amber-300 font-semibold bg-amber-100 dark:bg-amber-400/10 border border-amber-300 dark:border-amber-400/40"
              >
                <IconSparkle /> Surprise Me
              </button>
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => { setInput(s); inputRef.current?.focus(); }}
                  className="chip-btn flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full cursor-pointer whitespace-nowrap text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-500/10 border border-violet-300 dark:border-violet-500/30">
                  {s}
                </button>
              ))}
            </div>
            <style>
              {`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .scrollbar-custom::-webkit-scrollbar { display: none; }
              `}
            </style>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2 flex flex-col gap-3 scrollbar-custom">
            <div className="sm:hidden mb-2">
              <p className="text-[11px] text-slate-500 dark:text-[#4b5563] mb-1.5 ml-0.5">Try asking</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => { setInput(s); inputRef.current?.focus(); }}
                    className="chip-btn text-[11.5px] px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-500/10 border border-violet-300 dark:border-violet-500/30">
                    {s}
                  </button>
                ))}
                <button
                  onClick={surpriseMe}
                  className="surprise-chip flex items-center gap-1.5 text-[11.5px] px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap text-amber-600 dark:text-amber-300 font-semibold bg-amber-100 dark:bg-amber-400/10 border border-amber-300 dark:border-amber-400/40"
                >
                  <IconSparkle /> Surprise Me
                </button>
              </div>
            </div>

            {messages.map((msg, i) =>
              msg.content === "" ? null : (
                <Message key={msg.id || i} role={msg.role} content={msg.content} streaming={msg.id === streamingId} />
              )
            )}

            {loading && messages[messages.length - 1]?.content === "" && (
              <ThinkingIndicator status={thinkingStatus} />
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0 border-t border-violet-200 dark:border-violet-500/20 bg-slate-50 dark:bg-black/20">
            <textarea
              ref={inputRef}
              placeholder="Ask anything about Abhijit…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
              className="flex-1 rounded-[13px] px-3.5 py-2 text-[13.5px] text-slate-900 dark:text-[#e0e7ff] resize-none outline-none font-[inherit] leading-[1.45] max-h-24 transition-colors disabled:opacity-40 bg-white dark:bg-white/5 border border-slate-300 dark:border-violet-500/20 focus:border-violet-500 dark:focus:border-violet-500/50"
              style={{
                caretColor: "#a78bfa",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-[38px] h-[38px] rounded-[11px] border-none flex items-center justify-center flex-shrink-0 cursor-pointer transition-all hover:opacity-90 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 text-white"
              style={{
                background: "linear-gradient(135deg,#5b21b6,#1d4ed8)",
                boxShadow: "0 2px 10px rgba(79,31,189,0.4)"
              }}
            >
              <IconSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChat;