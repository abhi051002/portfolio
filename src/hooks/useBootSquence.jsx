import { useState, useEffect, useCallback } from "react";

export const useBootSequence = () => {
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [bootAnimation, setBootAnimation] = useState(false);
  const [shutterAnimation, setShutterAnimation] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing system...");
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  // Reset boot sequence to initial state
  const resetBootSequence = useCallback(() => {
    setBootAnimation(false);
    setShutterAnimation(false);
    setLoadingText("Initializing system...");
    setIsShuttingDown(false);
  }, []);

  // Start boot animation
  const startBootAnimation = useCallback(() => {
    if (showBootScreen && !bootAnimation && !isShuttingDown) {
      setBootAnimation(true);
      setTimeout(() => {
        setShutterAnimation(true);
      }, 800);
      setTimeout(() => {
        setShowBootScreen(false);
      }, 2800);
    }
  }, [showBootScreen, bootAnimation, isShuttingDown]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        startBootAnimation();
      }
    },
    [startBootAnimation]
  );

  const handleClick = useCallback(() => {
    startBootAnimation();
  }, [startBootAnimation]);

  useEffect(() => {
    if (showBootScreen) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [showBootScreen, handleKeyPress]);

  // Handle logout with shutdown animation
  const handleLogout = useCallback(() => {
    setIsShuttingDown(true);
    setLoadingText("Shutting down system...");
    // Reverse shutter animation
    setShutterAnimation(false);
    setTimeout(() => {
      setShowBootScreen(true);
      // Reset everything after showing boot screen
      setTimeout(() => {
        resetBootSequence();
      }, 100);
    }, 1000);
  }, [resetBootSequence]);

  return {
    showBootScreen,
    bootAnimation,
    shutterAnimation,
    loadingText,
    isShuttingDown,
    setShowBootScreen,
    handleLogout,
    handleClick,
  };
};
