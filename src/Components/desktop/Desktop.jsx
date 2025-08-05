"use client";
import { useState, useEffect } from "react";
import DesktopIcons from "./DesktopIcons";
import WindowManager from "./WindowManager";
import Taskbar from "./Taskbar";
import { useWindowManager } from "../../hooks/useWindowManager";
import { useFileManager } from "../../hooks/useFileManager";
import {
  LogOut,
  FileText,
  ExternalLink,
  Monitor,
  Smartphone,
} from "lucide-react";
import HexagonGrid from "../HexaGrid";
import PDFImage from "../../Image/pdf.png";

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
      // Don't trigger shortcuts when resizing
      if (windowManager.isResizing) return;

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

  // Prevent context menu on resize handles
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (windowManager.isResizing) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, [windowManager.isResizing]);

  const handleExit = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      onExit();
      setIsLoggingOut(false);
    }, 300);
  };

  const handleResumeClick = () => {
    window.open(
      "https://res.cloudinary.com/dzncl0gbm/image/upload/v1744692517/Abhijit_Nanda_Resume_cxsobk.pdf",
      "_blank"
    );
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

        {/* Center section with Date and Time */}
        <div className="flex items-center space-x-6 text-white text-sm">
          <span className="hidden sm:inline">{formatDate(currentTime)}</span>
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
          <span className="text-white text-xs hidden sm:inline">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>

      {/* Mobile View - Show message to use desktop */}
      <div className="block lg:hidden absolute inset-0 top-8">
        {/* Background with hexagon grid */}
        <div className="absolute inset-0 overflow-hidden">
          <HexagonGrid />
        </div>

        {/* Mobile message overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="text-center text-white max-w-md">
            <div className="mb-6">
              <Monitor className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Desktop Experience Required
              </h2>
            </div>

            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                This portfolio is designed as a desktop operating system
                experience.
              </p>
              <p>
                Please open this on a desktop or laptop computer to explore the
                full interactive experience.
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-600">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Smartphone className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold text-orange-400">
                  Mobile Alternative
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                You can still view my resume while on mobile:
              </p>
              <button
                onClick={handleResumeClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume (PDF)</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p>Best viewed on screens 1024px and wider</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View - Full experience */}
      <div className="hidden lg:block absolute inset-0 top-8 bg-gray-800">
        {/* Hexagon Grid for main desktop area (excluding sidebar) */}
        <div className="absolute left-16 top-0 right-0 bottom-0 overflow-hidden">
          <HexagonGrid />
        </div>

        {/* Resume File Icon - Top Right */}
        <div className="absolute top-4 right-4">
          <div
            className="group flex flex-col items-center space-y-1 cursor-pointer p-3 rounded-lg hover:bg-gray-600 hover:bg-opacity-50 transition-all duration-200"
            onClick={handleResumeClick}
            title="Open Resume (PDF)"
          >
            <div className="relative p-3 bg-opacity-70 rounded-lg">
              <img
                src={PDFImage || "/placeholder.svg"}
                alt="PDF"
                className="w-8 h-8 text-red-400"
              />
            </div>
            <span className="text-white text-xs text-center leading-tight px-2 py-1 rounded">
              AbhijitNanda
              <br />
              _Resume.pdf
            </span>
          </div>
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

        {/* Enhanced Keyboard Shortcuts Help */}
        <div className="absolute top-12 left-20 text-white text-xs bg-gray-900 bg-opacity-60 rounded p-2 backdrop-blur-sm">
          <div className="font-semibold mb-1">Shortcuts:</div>
          <div>Ctrl+M - Minimize All</div>
          <div>Ctrl+Q - Close All</div>
          <div>Ctrl+R - Restore All</div>
          <div>F9 - Show Desktop</div>
          <div className="mt-1 pt-1 border-t border-gray-600">
            <div className="font-semibold">Resize:</div>
            <div>Drag edges/corners</div>
            <div>Double-click title to maximize</div>
          </div>
        </div>

        {/* Resize cursor overlay when resizing */}
        {windowManager.isResizing && (
          <div className="absolute inset-0 z-50 pointer-events-none" />
        )}
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
