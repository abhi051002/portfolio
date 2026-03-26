"use client";
import { useCallback, useState } from "react";
import BootScreenPreloader from "./ui/preloader.jsx";

const BootScreen = ({
  bootAnimation,
  shutterAnimation,
  isShuttingDown = false,
  onContinue,
}) => {
  const [showPreloader, setShowPreloader] = useState(true);
  const handleComplete = useCallback(() => {
    setShowPreloader(false);
    onContinue();
  }, [onContinue]);

  return (
    <div className="h-screen w-screen bg-[#030712] flex items-center justify-center text-white relative overflow-hidden">
      {showPreloader && <BootScreenPreloader onComplete={handleComplete} />}
      {!isShuttingDown && showPreloader && (
        <button
          onClick={handleComplete}
          className="absolute bottom-8 right-8 z-[999999] text-white/50 hover:text-white/90 text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md cursor-pointer drop-shadow-lg"
        >
          Skip Boot
        </button>
      )}
    </div>
  );
};

export default BootScreen;
