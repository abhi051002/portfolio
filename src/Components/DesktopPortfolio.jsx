import BootScreen from "./bootScreen/BootScreen";
import Desktop from "./desktop/Desktop";
import { useBootSequence } from "../hooks/useBootSequence";

const DesktopPortfolio = () => {
  const {
    showBootScreen,
    bootAnimation,
    shutterAnimation,
    loadingText,
    isShuttingDown,
    handleLogout,
    handleClick,
  } = useBootSequence();

  if (showBootScreen) {
    return (
      <BootScreen
        bootAnimation={bootAnimation}
        shutterAnimation={shutterAnimation}
        loadingText={loadingText}
        isShuttingDown={isShuttingDown}
        onContinue={handleClick}
      />
    );
  }

  return <Desktop onExit={handleLogout} />;
};

export default DesktopPortfolio;
