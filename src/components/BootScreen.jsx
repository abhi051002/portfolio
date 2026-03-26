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
    <div className="h-screen w-screen bg-slate-50 dark:bg-[#030712] flex items-center justify-center text-slate-900 dark:text-white relative overflow-hidden">
      {showPreloader && <BootScreenPreloader onComplete={handleComplete} />}
      {!isShuttingDown && showPreloader && (
        <button
          onClick={handleComplete}
          className="absolute bottom-8 right-8 z-[999999] text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white/90 text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border border-slate-300 dark:border-white/20 hover:border-slate-500 dark:hover:border-white/40 px-5 py-2.5 rounded-full bg-slate-200/50 dark:bg-white/5 hover:bg-slate-300/50 dark:hover:bg-white/10 backdrop-blur-md cursor-pointer drop-shadow-lg"
        >
          Skip Boot
        </button>
      )}
    </div>
  );
};

export default BootScreen;
