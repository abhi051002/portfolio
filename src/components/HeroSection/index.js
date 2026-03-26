import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import HeroImg from "../../Image/HeroImage.png";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const Hero = () => {
  const { bioData, loading } = usePortfolio();

  if (loading.bio) {
    return (
      <div id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <Loader text="Loading profile..." size="70px" minHeight="100vh" />
      </div>
    );
  }

  if (!bioData) {
    return (
      <div id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <p className="text-white text-center px-8">Profile data not available</p>
      </div>
    );
  }

  return (
    <div
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-28 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left: Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.15 }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-violet-400 font-semibold text-sm tracking-widest uppercase mb-3"
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-4"
            >
              Hi, I'm{" "}
              <span className="gradient-text">{bioData.name}</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-3 text-xl sm:text-2xl font-semibold text-slate-600 dark:text-slate-300 mb-6 h-8"
            >
              <span>I'm a</span>
              <span className="text-violet-400">
                <Typewriter
                  options={{
                    strings: bioData.roles || [],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
            >
              {bioData.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href={bioData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                📄 Check My Resume
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-violet-500/50 hover:border-violet-400 text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 font-semibold rounded-xl transition-all duration-300"
              >
                💬 Contact Me
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {bioData.github && (
                <a href={bioData.github} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-violet-100 dark:hover:bg-violet-600/30 transition-all duration-300">
                  <FaGithub size={18} />
                </a>
              )}
              {bioData.linkedin && (
                <a href={bioData.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-blue-100 dark:hover:bg-blue-600/30 transition-all duration-300">
                  <FaLinkedin size={18} />
                </a>
              )}
              {bioData.twitter && (
                <a href={bioData.twitter} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-sky-100 dark:hover:bg-sky-600/30 transition-all duration-300">
                  <FaTwitter size={18} />
                </a>
              )}
              {bioData.email && (
                <a href={`mailto:${bioData.email}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-cyan-100 dark:hover:bg-cyan-600/30 transition-all duration-300">
                  <FaEnvelope size={18} />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 opacity-20 blur-xl animate-pulse" />
              {/* Spinning ring */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-violet-600 via-transparent to-cyan-500 animate-spin-slow opacity-60" />
              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-violet-500/40">
                <img
                  src={HeroImg}
                  alt={`${bioData.name}'s Profile`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0a0a1a] border border-green-500/40 rounded-full px-4 py-1.5 flex items-center gap-2 whitespace-nowrap shadow-lg">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-semibold">Available for Work</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;