import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { FaBars, FaTimes, FaGithub } from "react-icons/fa";
import { usePortfolio } from "../../context/PortfolioContext";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#apps" },
  { label: "Experience", href: "#experience" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, y: -10, scale: 0.97,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bioData } = usePortfolio();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP logo entrance animation
  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const handleClose = () => setIsOpen(false);

  const getNavHref = (link) => {
    if (isHome) return link.href;
    return `/${link.href}`;
  };

  const isActiveRoute = (link) =>
    !!(link.route && location.pathname === link.route);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#03020f]/85 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-0.5 font-bold text-xl group opacity-0"
          >
            <span className="text-violet-400 group-hover:text-violet-300 transition-colors font-mono">&lt;</span>
            <span className="gradient-text-static">Abhijit</span>
            <span className="text-slate-500 font-mono">/</span>
            <span className="gradient-text-static">Nanda</span>
            <span className="text-violet-400 group-hover:text-violet-300 transition-colors font-mono">&gt;</span>
          </Link>

          {/* Desktop nav links */}
          <motion.ul
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={getNavHref(link)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActiveRoute(link)
                      ? "text-violet-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover background */}
                  <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
                  {/* Active / hover underline */}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all duration-300 ${
                      isActiveRoute(link) ? "w-5" : "w-0 group-hover:w-5"
                    }`}
                  />
                </a>
              </li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={bioData?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/90 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-neon hover:-translate-y-0.5 border border-violet-500/40"
            >
              <FaGithub size={15} />
              GitHub
            </a>
          </motion.div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden mx-3 mb-3 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(8,8,24,0.97)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <ul className="flex flex-col gap-0.5 p-3">
              {navLinks.map((link, i) => (
                <motion.li key={link.href} custom={i} variants={mobileLinkVariants} initial="hidden" animate="visible">
                  <a
                    href={getNavHref(link)}
                    onClick={handleClose}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActiveRoute(link)
                        ? "text-violet-400 bg-violet-500/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-3 pb-3">
              <a
                href={bioData?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
              >
                <FaGithub size={15} />
                GitHub Profile
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
