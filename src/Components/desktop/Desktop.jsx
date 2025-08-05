"use client";
import { useState, useEffect } from "react";
import DesktopIcons from "./DesktopIcons";
import WindowManager from "./WindowManager";
import Taskbar from "./Taskbar";
import { useWindowManager } from "../../hooks/useWindowManager";
import { useFileManager } from "../../hooks/useFileManager";
import { LogOut } from "lucide-react";
import HexagonGrid from "../HexaGrid";

const Desktop = ({ onExit }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const windowManager = useWindowManager();
  const fileManager = useFileManager();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl (or Cmd on Mac) is pressed
      const isCtrlPressed = event.ctrlKey || event.metaKey;

      if (isCtrlPressed) {
        switch (event.key.toLowerCase()) {
          case "m":
            // Ctrl+M: Minimize all windows
            event.preventDefault();
            windowManager.minimizeAllWindows();
            break;
          case "q":
            // Ctrl+Q: Close all windows
            event.preventDefault();
            windowManager.closeAllWindows();
            break;
          case "r":
            // Ctrl+R: Restore all minimized windows
            event.preventDefault();
            windowManager.restoreAllWindows();
            break;
          default:
            break;
        }
      }

      // Show desktop shortcut (Super/Windows key + D equivalent)
      if (event.key === "F9") {
        event.preventDefault();
        windowManager.toggleShowDesktop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [windowManager]);

  const handleExit = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      onExit();
      setIsLoggingOut(false);
    }, 300);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-800">
      {/* Top Bar */}
      <div className="bg-gray-800 w-full h-8 flex items-center justify-between px-4 border-b border-gray-700 z-30 relative">
        <div className="text-white text-sm font-medium">Abhijit Nanda</div>

        {/* Date and Time */}
        <div className="flex items-center space-x-4 text-white text-sm">
          <span>{formatDate(currentTime)}</span>
          <span className="font-mono">{formatTime(currentTime)}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleExit}
          disabled={isLoggingOut}
          className={`group flex items-center space-x-2 px-3 py-1 rounded transition-all duration-300 ${
            isLoggingOut ? "bg-red-500 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
          title="Logout"
        >
          <LogOut
            className={`w-4 h-4 transition-all duration-300 ${
              isLoggingOut
                ? "text-white animate-spin"
                : "text-white group-hover:text-red-300"
            }`}
          />
          <span className="text-white text-xs">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>

      {/* Main Desktop Area */}
      <div className="absolute inset-0 top-8 bg-gray-800">
        {/* Hexagon Grid for main desktop area (excluding sidebar) */}
        <div className="absolute left-16 top-0 right-0 bottom-0 overflow-hidden">
          <HexagonGrid />
        </div>

        <DesktopIcons
          onToggleWindow={windowManager.toggleWindow}
          userFiles={fileManager.userFiles}
          showFileCreator={fileManager.showFileCreator}
          setShowFileCreator={fileManager.setShowFileCreator}
          createFile={fileManager.createFile}
        />

        <WindowManager
          windowManager={windowManager}
          userFiles={fileManager.userFiles}
        />

        <Taskbar
          currentTime={currentTime}
          openWindows={windowManager.openWindows}
          windowStates={windowManager.windowStates}
          onMinimizeWindow={windowManager.minimizeWindow}
          onRestoreWindow={windowManager.restoreWindow}
        />
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="absolute top-12 left-20 text-white text-xs bg-gray-900 bg-opacity-60 rounded p-2 backdrop-blur-sm">
        <div className="font-semibold mb-1">Shortcuts:</div>
        <div>Ctrl+M - Minimize All</div>
        <div>Ctrl+Q - Close All</div>
        <div>Ctrl+R - Restore All</div>
      </div>

      {/* Logout overlay effect */}
      {isLoggingOut && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="text-white text-xl font-mono animate-pulse">
            Logging out...
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
