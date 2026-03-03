import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaHeart } from "react-icons/fa";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#apps" },
  { label: "Experience", href: "#experience" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const { bioData } = usePortfolio();

  const socialLinks = [
    { icon: FaGithub, href: bioData?.github, label: "GitHub" },
    { icon: FaLinkedin, href: bioData?.linkedin, label: "LinkedIn" },
    { icon: FaTwitter, href: bioData?.twitter, label: "Twitter" },
    { icon: FaInstagram, href: bioData?.insta, label: "Instagram" },
    { icon: FaEnvelope, href: bioData?.email ? `mailto:${bioData.email}` : null, label: "Email" },
  ].filter((s) => s.href);

  return (
    <footer className="relative border-t border-white/5 bg-[#030712]">
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-0.5 font-bold text-xl mb-3">
              <span className="text-violet-400">&lt;</span>
              <span className="gradient-text">Abhijit</span>
              <span className="text-slate-400">/</span>
              <span className="gradient-text">Nanda</span>
              <span className="text-violet-400">&gt;</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Full-stack developer passionate about building elegant, performant web applications.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Sections</h4>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-violet-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Connect</h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-violet-600/30 hover:border-violet-500/40 transition-all duration-200"
                  title={label}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-sm text-center">
            © {new Date().getFullYear()} Abhijit Nanda. All rights reserved.
          </p>
          <p className="text-slate-600 text-sm flex items-center gap-1.5">
            Made with <FaHeart className="text-red-500 text-xs animate-pulse" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
