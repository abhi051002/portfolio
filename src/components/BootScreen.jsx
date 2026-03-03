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
    </div>
  );
};

export default BootScreen;
