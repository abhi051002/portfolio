import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BootScreen from "./components/BootScreen"; // Import your BootScreen component
import { useBootSequence } from "../src/hooks/useBootSquence";
import "./App.css";
import { PortfolioProvider } from "./context/PortfolioContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const MainApp = () => {
  const {
    showBootScreen,
    bootAnimation,
    shutterAnimation,
    loadingText,
    isShuttingDown,
    handleClick,
  } = useBootSequence();

  return (
    <React.StrictMode>
      <PortfolioProvider>
        {showBootScreen ? (
          <BootScreen
            bootAnimation={bootAnimation}
            shutterAnimation={shutterAnimation}
            loadingText={loadingText}
            isShuttingDown={isShuttingDown}
            onContinue={handleClick}
          />
        ) : (
          <App />
        )}
      </PortfolioProvider>
    </React.StrictMode>
  );
};

root.render(<MainApp />);
