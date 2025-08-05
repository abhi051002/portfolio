import { useState } from "react";

export const useWindowManager = () => {
  const [openWindows, setOpenWindows] = useState({});
  const [windowStates, setWindowStates] = useState({});
  const [zIndexCounter, setZIndexCounter] = useState(1000);
  const [showDesktopMode, setShowDesktopMode] = useState(false);
  const [previousWindowStates, setPreviousWindowStates] = useState({});

  const toggleWindow = (windowId) => {
    if (openWindows[windowId]) {
      setOpenWindows((prev) => ({
        ...prev,
        [windowId]: false,
      }));
    } else {
      setOpenWindows((prev) => ({
        ...prev,
        [windowId]: true,
      }));

      if (!windowStates[windowId]) {
        const defaultPositions = {
          terminal: { x: 80, y: 80 },
          browser: { x: 120, y: 120 },
          projects: { x: 160, y: 160 },
          files: { x: 200, y: 100 },
        };

        setWindowStates((prev) => ({
          ...prev,
          [windowId]: {
            x: defaultPositions[windowId]?.x || 100,
            y: defaultPositions[windowId]?.y || 100,
            width: windowId === "terminal" ? 700 : 600,
            height: windowId === "terminal" ? 450 : 400,
            isMaximized: false,
            isMinimized: false,
            zIndex: zIndexCounter,
          },
        }));
        setZIndexCounter((prev) => prev + 1);
      }
    }
  };

  const closeWindow = (windowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: false,
    }));
  };

  const minimizeWindow = (windowId) => {
    setWindowStates((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMinimized: true,
      },
    }));
  };

  const maximizeWindow = (windowId) => {
    setWindowStates((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMaximized: !prev[windowId]?.isMaximized,
        isMinimized: false,
      },
    }));
  };

  const restoreWindow = (windowId) => {
    setWindowStates((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMinimized: false,
      },
    }));
  };

  const bringToFront = (windowId) => {
    setWindowStates((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        zIndex: zIndexCounter,
      },
    }));
    setZIndexCounter((prev) => prev + 1);
  };

  const updateWindowPosition = (windowId, x, y) => {
    setWindowStates((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        x,
        y,
      },
    }));
  };

  const updateWindowSize = (windowId, width, height) => {
    setWindowStates((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        width,
        height,
      },
    }));
  };

  // New functions for keyboard shortcuts
  const minimizeAllWindows = () => {
    const openWindowIds = Object.keys(openWindows).filter(
      (windowId) => openWindows[windowId]
    );

    setWindowStates((prev) => {
      const newStates = { ...prev };
      openWindowIds.forEach((windowId) => {
        if (newStates[windowId]) {
          newStates[windowId] = {
            ...newStates[windowId],
            isMinimized: true,
          };
        }
      });
      return newStates;
    });
  };

  const closeAllWindows = () => {
    const openWindowIds = Object.keys(openWindows).filter(
      (windowId) => openWindows[windowId]
    );

    setOpenWindows((prev) => {
      const newOpenWindows = { ...prev };
      openWindowIds.forEach((windowId) => {
        newOpenWindows[windowId] = false;
      });
      return newOpenWindows;
    });
  };

  const restoreAllWindows = () => {
    const openWindowIds = Object.keys(openWindows).filter(
      (windowId) => openWindows[windowId]
    );

    setWindowStates((prev) => {
      const newStates = { ...prev };
      openWindowIds.forEach((windowId) => {
        if (newStates[windowId]) {
          newStates[windowId] = {
            ...newStates[windowId],
            isMinimized: false,
          };
        }
      });
      return newStates;
    });
  };

  const toggleShowDesktop = () => {
    const openWindowIds = Object.keys(openWindows).filter(
      (windowId) => openWindows[windowId]
    );

    if (!showDesktopMode) {
      // Save current states and minimize all
      const currentStates = {};
      openWindowIds.forEach((windowId) => {
        if (windowStates[windowId]) {
          currentStates[windowId] = {
            isMinimized: windowStates[windowId].isMinimized,
          };
        }
      });
      setPreviousWindowStates(currentStates);

      setWindowStates((prev) => {
        const newStates = { ...prev };
        openWindowIds.forEach((windowId) => {
          if (newStates[windowId]) {
            newStates[windowId] = {
              ...newStates[windowId],
              isMinimized: true,
            };
          }
        });
        return newStates;
      });
      setShowDesktopMode(true);
    } else {
      // Restore previous states
      setWindowStates((prev) => {
        const newStates = { ...prev };
        openWindowIds.forEach((windowId) => {
          if (newStates[windowId] && previousWindowStates[windowId]) {
            newStates[windowId] = {
              ...newStates[windowId],
              isMinimized: previousWindowStates[windowId].isMinimized,
            };
          }
        });
        return newStates;
      });
      setShowDesktopMode(false);
      setPreviousWindowStates({});
    }
  };

  return {
    openWindows,
    windowStates,
    toggleWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
    // New shortcut functions
    minimizeAllWindows,
    closeAllWindows,
    restoreAllWindows,
    toggleShowDesktop,
  };
};
