import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BootScreen from "./components/BootScreen";
import { useBootSequence } from "../src/hooks/useBootSquence";
import "./App.css";
import { PortfolioProvider } from "./context/PortfolioContext";
import { ThemeProvider } from "./context/ThemeContext";

// Ensure the app always runs under /portfolio 
if (!window.location.pathname.startsWith("/portfolio")) {
  window.location.replace("/portfolio" + window.location.pathname + window.location.search + window.location.hash);
}

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
      <ThemeProvider>
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
      </ThemeProvider>
    </React.StrictMode>
  );
};

root.render(<MainApp />);
