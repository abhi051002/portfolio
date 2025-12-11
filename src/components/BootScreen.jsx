"use client";
import { useCallback, useState } from "react";
import Preloader from "./ui/preloader.tsx";

const BootScreen = ({
  bootAnimation,
  shutterAnimation,
  isShuttingDown = false,
  onContinue,
}) => {
  const [showPreloader, setShowPreloader] = useState(true);
  const handleComplete = useCallback(() => {
    setShowPreloader(false)
    onContinue()
  }, [onContinue]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center text-white font-mono relative overflow-hidden">
      {showPreloader && <Preloader onComplete={handleComplete} />}
    </div>
  );
};

export default BootScreen;
