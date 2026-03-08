import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

// ─── Preset variants ─────────────────────────────────────────────────────────
const presets = {
  "fade-up": {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  "rotate-in": {
    hidden: { opacity: 0, rotate: -8, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  // ─── New wow-factor presets ─────────────────────────────────────────────────
  "clip-reveal": {
    hidden: { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
    visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  },
  "morph-in": {
    hidden: { opacity: 0, scale: 0.5, borderRadius: "50%", filter: "blur(20px)" },
    visible: { opacity: 1, scale: 1, borderRadius: "0%", filter: "blur(0px)" },
  },
  "flip-up": {
    hidden: { opacity: 0, rotateX: 90, y: 40 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  "zoom-blur": {
    hidden: { opacity: 0, scale: 1.3, filter: "blur(15px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "slide-up-spring": {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  },
};

// Spring transition for bouncy presets
const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.8,
};

/**
 * ScrollReveal — wraps children in a scroll-triggered animation.
 */
export const ScrollReveal = ({
  children,
  preset = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const variants = presets[preset] || presets["fade-up"];
  const useSpringTransition = preset === "slide-up-spring" || preset === "flip-up";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={
        useSpringTransition
          ? { ...springTransition, delay }
          : { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer — staggers child ScrollReveal items.
 */
export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem — animate individual item inside StaggerContainer.
 */
export const StaggerItem = ({
  children,
  className = "",
  preset = "fade-up",
  duration = 0.5,
  ...props
}) => {
  const variants = presets[preset] || presets["fade-up"];

  return (
    <motion.div
      variants={variants}
      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * ParallaxSection — scroll-linked parallax movement.
 */
export const ParallaxSection = ({
  children,
  speed = -30,
  className = "",
  ...props
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...props}>
      {children}
    </motion.div>
  );
};

/**
 * SectionHeading — animated section heading with parallax.
 */
export const SectionHeading = ({
  title,
  highlight,
  subtitle,
  className = "",
}) => {
  return (
    <ScrollReveal preset="blur-in" className={`text-center mb-14 ${className}`}>
      <ParallaxSection speed={-15}>
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight">
          {title}{" "}
          <span className="gradient-text">{highlight}</span>
        </h2>
        {subtitle && (
          <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
            {subtitle}
          </p>
        )}
        <div className="mt-4 w-20 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 rounded-full mx-auto" />
      </ParallaxSection>
    </ScrollReveal>
  );
};

/**
 * ScrollProgressBar — a gradient progress bar fixed to the top of the viewport.
 */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)",
        transformOrigin: "0%",
        zIndex: 9999,
      }}
    />
  );
};

/**
 * PageTransition — wrap page content for enter/exit animations.
 */
export const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
