import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart } from "react-icons/fa";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#apps" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const { bioData } = usePortfolio();

  const socials = [
    { href: bioData?.github,   Icon: FaGithub,    label: "GitHub" },
    { href: bioData?.linkedin, Icon: FaLinkedin,  label: "LinkedIn" },
    { href: bioData?.twitter,  Icon: FaTwitter,   label: "Twitter" },
    { href: bioData?.insta,    Icon: FaInstagram, label: "Instagram" },
  ].filter((s) => s.href);

  return (
    <footer className="relative border-t border-white/5 py-12 px-4">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-60" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.04 }}
            className="text-2xl font-bold"
          >
            <span className="text-violet-400 font-mono">&lt;</span>
            <span className="gradient-text-static">Abhijit</span>
            <span className="text-slate-500 font-mono">/</span>
            <span className="gradient-text-static">Nanda</span>
            <span className="text-violet-400 font-mono">&gt;</span>
          </motion.a>

          {/* Tagline */}
          <p className="text-slate-500 text-sm max-w-sm">
            Building elegant, high-performance web applications that make a difference.
          </p>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-500 text-sm hover:text-violet-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass border border-white/8 flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
                title={label}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/5" />

          {/* Copyright */}
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            Built with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaHeart size={10} className="text-violet-500" />
            </motion.span>
            by {bioData?.name || "Abhijit Nanda"} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
