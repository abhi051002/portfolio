"use client";
import {
  Circle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  FileText,
} from "lucide-react";
import { Bio } from "../../data/constants.js";
import HeroImg from "../../Image/HeroImage.jpeg";
import { useTypewriter } from "../../hooks/useTypeWritter.jsx"; // Import the new hook

const BootScreen = ({
  bootAnimation,
  shutterAnimation,
  isShuttingDown = false,
  onContinue,
}) => {
  const displayedRole = useTypewriter(Bio.roles, 100, 1500); // Use the typewriter hook

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center text-white font-mono relative overflow-hidden">
      {/* Enhanced Animated background particles - Responsive count */}
      <div className="absolute inset-0">
        {[
          ...Array(
            window.innerWidth < 768 ? 40 : window.innerWidth < 1024 ? 60 : 80
          ),
        ].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              isShuttingDown
                ? "bg-red-400 animate-ping"
                : i % 3 === 0
                ? "bg-blue-400 animate-pulse"
                : i % 3 === 1
                ? "bg-purple-400 animate-pulse"
                : "bg-cyan-400 animate-pulse"
            }`}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes - Responsive count */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(window.innerWidth < 768 ? 3 : 6)].map((_, i) => (
          <div
            key={i}
            className={`absolute border border-blue-400 opacity-20 ${
              i % 2 === 0 ? "rotate-45" : "rotate-12"
            } animate-pulse`}
            style={{
              width: `${
                30 + Math.random() * (window.innerWidth < 768 ? 30 : 60)
              }px`,
              height: `${
                30 + Math.random() * (window.innerWidth < 768 ? 30 : 60)
              }px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Boot Screen Content */}
      <div
        className={`text-center transition-all duration-1000 ${
          bootAnimation ? "-translate-y-full opacity-0" : ""
        } z-10 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8`}
      >
        {!isShuttingDown ? (
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6">
              {/* Profile Image - Responsive sizing */}
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1 animate-pulse">
                  <img
                    src={HeroImg || "/placeholder.svg"}
                    alt="Abhijit Nanda"
                    className="w-full h-full rounded-full object-cover bg-gray-700"
                  />
                </div>
              </div>

              {/* Name and Title - Responsive typography */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse leading-tight">
                  {Bio.name}
                </h1>

                {/* Roles with typing animation effect - Responsive spacing */}
                <div className="text-lg md:text-xl text-gray-300 min-h-[1.5em]">
                  <span className="text-green-400">{">"}</span> {displayedRole}
                  <span className="inline-block w-1 h-4 bg-green-400 animate-blink ml-1"></span>
                </div>
              </div>

              {/* Description - Responsive text and spacing */}
              <p
                className="text-xs line-clamp-3 sm:text-sm md:text-base text-gray-400 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl leading-relaxed opacity-0 animate-fade-in px-2 sm:px-0"
                style={{ animationDelay: "4s", animationFillMode: "forwards" }}
              >
                {Bio.description}
              </p>

              {/* Social Links - Responsive sizing and spacing */}
              <div
                className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 opacity-0 animate-fade-in"
                style={{
                  animationDelay: "4.5s",
                  animationFillMode: "forwards",
                }}
              >
                <a
                  href={Bio.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-blue-400" />
                </a>
                <a
                  href={Bio.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-blue-400" />
                </a>
                <a
                  href={Bio.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-blue-400" />
                </a>
                <a
                  href={Bio.insta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-blue-400" />
                </a>
                <a
                  href={Bio.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-blue-400" />
                </a>
              </div>
            </div>

            {/* Continue Button - Responsive sizing */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div
                className="inline-block px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full cursor-pointer select-none transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 opacity-0 animate-fade-in"
                style={{ animationDelay: "5s", animationFillMode: "forwards" }}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onContinue();
                  }
                }}
              >
                <span className="hidden sm:inline text-white text-sm sm:text-base font-semibold">
                  Press Enter to Continue
                </span>
                <span className="sm:hidden text-white text-sm font-semibold">
                  Tap to Enter Portfolio OS
                </span>
              </div>

              <div
                className="text-xs sm:text-sm text-gray-500 opacity-0 animate-fade-in px-4 sm:px-0"
                style={{
                  animationDelay: "5.5s",
                  animationFillMode: "forwards",
                }}
              >
                Experience my portfolio as an interactive desktop environment
              </div>
            </div>
          </div>
        ) : (
          /* Shutdown Screen - Responsive sizing */
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-red-400 to-orange-500 p-1 mx-auto">
              <img
                src={HeroImg || "/placeholder.svg"}
                alt="Abhijit Nanda"
                className="w-full h-full rounded-full object-cover bg-gray-700 opacity-50"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
              Goodbye!
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">
              Thanks for visiting my portfolio
            </p>
            <div className="text-sm sm:text-base text-orange-400 animate-pulse">
              System Shutting Down...
            </div>
          </div>
        )}

        {/* System info - Responsive positioning and sizing */}
        <div className="mt-6 sm:mt-8 md:mt-12 text-xs opacity-30 space-y-1">
          <div>Portfolio OS v2.0.1</div>
          <div className="hidden sm:block">Built with React & Tailwind CSS</div>
          <div className="flex items-center justify-center space-x-2 mt-2 sm:mt-4">
            <Circle
              className={`w-2 h-2 fill-current ${
                isShuttingDown
                  ? "animate-ping text-red-400"
                  : "animate-ping text-green-400"
              }`}
            />
            <span className="text-xs">
              System Status: {isShuttingDown ? "Shutting Down" : "Online"}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Shutter Effect */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none ${
          shutterAnimation || isShuttingDown ? "" : "opacity-0"
        }`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-900 to-gray-800 transition-transform duration-2000 ease-in-out ${
            shutterAnimation && !isShuttingDown
              ? "-translate-y-full"
              : isShuttingDown
              ? "translate-y-0"
              : "translate-y-0"
          }`}
        >
          <div className="absolute bottom-0 left-0 w-full h-2 sm:h-3 md:h-4 bg-gradient-to-t from-gray-600 to-gray-800 shadow-lg"></div>
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-gray-600 rounded"></div>
        </div>
        <div
          className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-900 to-gray-800 transition-transform duration-2000 ease-in-out ${
            shutterAnimation && !isShuttingDown
              ? "translate-y-full"
              : isShuttingDown
              ? "translate-y-0"
              : "translate-y-0"
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-2 sm:h-3 md:h-4 bg-gradient-to-b from-gray-600 to-gray-800 shadow-lg"></div>
          <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-gray-600 rounded"></div>
        </div>
        <div
          className={`absolute top-1/2 left-0 w-full h-0.5 bg-gray-500 transform -translate-y-1/2 transition-opacity duration-1000 ${
            shutterAnimation && !isShuttingDown ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        {/* Enhanced light rays */}
        <div
          className={`absolute inset-0 z-15 pointer-events-none transition-all duration-1500 ${
            shutterAnimation && !isShuttingDown ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-transparent to-purple-400 opacity-30 animate-pulse"></div>
          <div
            className="absolute inset-0 bg-gradient-to-tl from-cyan-400 via-transparent to-pink-400 opacity-20 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-ping,
          .animate-fade-in,
          .animate-blink {
            animation: none;
          }

          .transition-all,
          .transition-transform,
          .transition-opacity,
          .transition-colors {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
