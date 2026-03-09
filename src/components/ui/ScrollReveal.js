import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { pageEnter } from '../../animations/variants';

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, width: '100%' }}
    />
  );
};

// ─── Scroll Reveal Wrapper ────────────────────────────────────────────────────
export const ScrollReveal = ({
  children,
  variants,
  delay = 0,
  threshold = 0.15,
  className = '',
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const defaultVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants || defaultVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Page Transition Wrapper ──────────────────────────────────────────────────
export const PageTransition = ({ children }) => (
  <motion.div
    variants={pageEnter}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
