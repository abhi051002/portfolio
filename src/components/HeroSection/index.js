import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import Typewriter from "typewriter-effect";
import HeroImg from "../../Image/HeroImage.jpeg";
import HeroBgAnimation from "../HeroBgAnimation";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDownload } from "react-icons/fa";
import {
  SiReact, SiNodedotjs, SiLaravel, SiPhp, SiNextdotjs,
  SiPostgresql, SiMongodb, SiDocker, SiTailwindcss,
} from "react-icons/si";
import useCounter from "../../hooks/useCounter";

// Floating tech icons positioned around the hero image
const floatingIcons = [
  { icon: SiReact,      color: "#61dafb", top: "8%",  left: "70%", size: 28, delay: 0 },
  { icon: SiNodedotjs,  color: "#68a063", top: "20%", left: "90%", size: 24, delay: 1.2 },
  { icon: SiLaravel,    color: "#ff2d20", top: "70%", left: "88%", size: 26, delay: 0.6 },
  { icon: SiPhp,        color: "#777bb3", top: "85%", left: "65%", size: 22, delay: 1.8 },
  { icon: SiNextdotjs,  color: "#ffffff", top: "85%", left: "15%", size: 24, delay: 0.9 },
  { icon: SiPostgresql, color: "#336791", top: "70%", left: "5%",  size: 22, delay: 1.5 },
  { icon: SiMongodb,    color: "#4db33d", top: "20%", left: "2%",  size: 24, delay: 0.3 },
  { icon: SiTailwindcss,color: "#38bdf8", top: "5%",  left: "25%", size: 24, delay: 2.1 },
  { icon: SiDocker,     color: "#0db7ed", top: "5%",  left: "50%", size: 22, delay: 1 },
];

// Stat counter item
const StatItem = ({ value, label, suffix = "+", inView }) => {
  const count = useCounter(value, 2000, inView);
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold gradient-text-static">
        {count}{suffix}
      </div>
      <div className="text-xs text-slate-500 mt-0.5 font-medium">{label}</div>
    </div>
  );
};

const Hero = () => {
  const { bioData, loading } = usePortfolio();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  // GSAP in/out reveal
  useEffect(() => {
    if (!bioData) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-text-reveal",
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.9, stagger: 0.12,
        }
      );

      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );

      tl.fromTo(
        ".hero-socials",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );

      // Image
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.85, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: 1.1, ease: "expo.out" },
        0.2
      );

      // Floating icons
      gsap.fromTo(
        ".float-icon",
        { opacity: 0, scale: 0 },
        {
          opacity: 1, scale: 1,
          duration: 0.6, stagger: 0.08,
          ease: "back.out(1.7)",
          delay: 0.8,
        }
      );

      // Continuous float on icons
      gsap.to(".float-icon", {
        y: "random(-12, 12)",
        x: "random(-8, 8)",
        duration: "random(4, 7)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "random",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [bioData]);

  if (loading.bio) {
    return (
      <div id="about" className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0"><HeroBgAnimation /></div>
        <Loader text="Loading profile..." size="70px" minHeight="100vh" />
      </div>
    );
  }

  if (!bioData) {
    return (
      <div id="about" className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0"><HeroBgAnimation /></div>
        <p className="text-white text-center px-8">Profile data not available</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} id="about" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <HeroBgAnimation />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-28 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* ── Left: Text ─────────────────────────────────── */}
          <div ref={textRef} className="flex-1 text-center lg:text-left">

            {/* Eyebrow */}
            <div className="hero-text-reveal opacity-0 mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Available for work
            </div>

            {/* Name */}
            <h1 className="hero-text-reveal opacity-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-4">
              Hi, I'm{" "}
              <span className="gradient-text">{bioData.name}</span>
            </h1>

            {/* Role typewriter */}
            <div className="hero-text-reveal opacity-0 flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-semibold text-slate-300 mb-6 h-9">
              <span>I'm a</span>
              <span className="text-violet-400 min-w-[220px]">
                <Typewriter
                  options={{
                    strings: bioData.roles || ["Full-Stack Developer", "Backend Engineer"],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 40,
                  }}
                />
              </span>
            </div>

            {/* Description */}
            <p className="hero-text-reveal opacity-0 text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 text-balance">
              {bioData.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <a
                href={bioData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta btn-primary opacity-0"
              >
                <span className="flex items-center gap-2">
                  <FaDownload size={13} />
                  Download Resume
                </span>
              </a>
              <a href="#apps" className="hero-cta btn-outline opacity-0">
                <span>View My Work</span>
              </a>
              <a href="#contact" className="hero-cta btn-outline opacity-0">
                Contact Me
              </a>
            </div>

            {/* Social links */}
            <div className="hero-socials opacity-0 flex items-center justify-center lg:justify-start gap-3">
              {[
                { href: bioData.github, Icon: FaGithub, color: "hover:bg-slate-700/50 hover:border-slate-500/50" },
                { href: bioData.linkedin, Icon: FaLinkedin, color: "hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-400" },
                { href: bioData.twitter, Icon: FaTwitter, color: "hover:bg-sky-600/20 hover:border-sky-500/50 hover:text-sky-400" },
                { href: `mailto:${bioData.email}`, Icon: FaEnvelope, color: "hover:bg-violet-600/20 hover:border-violet-500/50 hover:text-violet-400" },
              ].filter(s => s.href).map(({ href, Icon, color }, i) => (
                <a
                  key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-xl glass border border-white/8 text-slate-400 transition-all duration-300 ${color}`}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Image + Floating Icons ─────────────── */}
          <div ref={imageRef} className="flex-shrink-0 relative opacity-0" style={{ width: 380, height: 380 }}>
            {/* Floating tech icons */}
            {floatingIcons.map(({ icon: Icon, color, top, left, size, delay }, i) => (
              <div
                key={i}
                className="float-icon absolute opacity-0 flex items-center justify-center w-10 h-10 rounded-xl glass-strong shadow-glass"
                style={{ top, left, zIndex: 10 }}
              >
                <Icon size={size} color={color} />
              </div>
            ))}

            {/* Image container */}
            <div className="relative" style={{ width: 300, height: 300, margin: "40px auto" }}>
              {/* Rotating gradient rings */}
              <div
                className="absolute -inset-4 rounded-full opacity-60 animate-spin-slow"
                style={{
                  background: "conic-gradient(from 0deg, #7c3aed, #a855f7, #06b6d4, transparent, #7c3aed)",
                  filter: "blur(2px)",
                }}
              />
              <div
                className="absolute -inset-2 rounded-full opacity-40 animate-spin-reverse"
                style={{
                  background: "conic-gradient(from 180deg, #06b6d4, transparent, #7c3aed, transparent, #06b6d4)",
                  filter: "blur(1px)",
                }}
              />

              {/* Glow halo */}
              <div className="absolute -inset-8 rounded-full opacity-25 blur-2xl" style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />

              {/* Profile image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-violet-500/30 shadow-[0_0_60px_rgba(124,58,237,0.25)]">
                <img
                  src={HeroImg}
                  alt={`${bioData.name}'s Profile`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse at 30% 30%, transparent 60%, rgba(3,2,15,0.3) 100%)" }} />
              </div>
            </div>

            {/* Stats strip */}
            <div ref={statsRef} className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full px-4">
              <div className="glass-strong rounded-2xl p-4 flex items-center justify-around gap-4">
                <StatItem value={3} label="Years Exp." inView={statsInView} />
                <div className="w-px h-8 bg-white/10" />
                <StatItem value={5} label="Companies" inView={statsInView} />
                <div className="w-px h-8 bg-white/10" />
                <StatItem value={15} label="Projects" inView={statsInView} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span className="text-slate-500 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-violet-400"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;