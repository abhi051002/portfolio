import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaGithub } from "react-icons/fa";
import { usePortfolio } from "../../context/PortfolioContext";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#apps", route: "/projects" },
  { label: "Experience", href: "#experience" },
  { label: "Articles", href: "#articles", route: "/articles" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bioData } = usePortfolio();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => setIsOpen(false);

  // On sub-pages, clicking a hash link should navigate back to homepage + hash
  const getNavHref = (link) => {
    if (isHome) return link.href;
    return `/${link.href}`;
  };

  const isActiveRoute = (link) => {
    if (link.route && location.pathname === link.route) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-violet-900/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-0.5 font-bold text-xl group"
          >
            <span className="text-violet-400 group-hover:text-violet-300 transition-colors">&lt;</span>
            <span className="gradient-text">Abhijit</span>
            <span className="text-slate-400">/</span>
            <span className="gradient-text">Nanda</span>
            <span className="text-violet-400 group-hover:text-violet-300 transition-colors">&gt;</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={getNavHref(link)}
                  className={`text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-violet-500 after:transition-all after:duration-300 hover:after:w-full ${
                    isActiveRoute(link)
                      ? "text-violet-400 after:w-full"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* GitHub Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={bioData?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5"
            >
              <FaGithub size={16} />
              GitHub Profile
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/5 px-4 pb-4 pt-2">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={getNavHref(link)}
                  onClick={handleClose}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActiveRoute(link)
                      ? "text-violet-400 bg-violet-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-white/5">
            <a
              href={bioData?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors duration-200"
            >
              <FaGithub size={16} />
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
