import React from "react";
import { Circle } from "lucide-react";

const BootScreen = ({
  bootAnimation,
  shutterAnimation,
  isShuttingDown = false,
}) => {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center text-white font-mono relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-400 rounded-full ${
              isShuttingDown ? "animate-ping" : "animate-pulse"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Boot Screen Content */}
      <div
        className={`text-center transition-all duration-1000 ${
          bootAnimation ? "-translate-y-full opacity-0" : ""
        } z-10`}
      >
        <div className="mb-8">
          <div
            className={`text-4xl mb-6 font-bold bg-gradient-to-r ${
              isShuttingDown
                ? "from-red-400 to-orange-500"
                : "from-blue-400 to-purple-500"
            } bg-clip-text text-transparent animate-pulse`}
          >
            Portfolio OS
          </div>
          <div className="text-xl mb-4">
            {isShuttingDown
              ? "Goodbye! Thanks for visiting"
              : "Welcome to My Digital Workspace"}
          </div>
          {!isShuttingDown ? (
            <div className="animate-bounce text-green-400">
              Press Enter to continue
            </div>
          ) : (
            <div className="text-orange-400 animate-pulse">
              System Shutting Down...
            </div>
          )}
        </div>

        {/* System info */}
        <div className="mt-8 text-xs opacity-50 space-y-1">
          <div>Portfolio OS v2.0.1</div>
          <div>Built with React & Tailwind CSS</div>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Circle
              className={`w-2 h-2 fill-current ${
                isShuttingDown
                  ? "animate-ping text-red-400"
                  : "animate-ping text-green-400"
              }`}
            />
            <span>
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
          <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-gray-600 to-gray-800 shadow-lg"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded"></div>
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
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-gray-600 to-gray-800 shadow-lg"></div>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded"></div>
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
    </div>
  );
};

export default BootScreen;
