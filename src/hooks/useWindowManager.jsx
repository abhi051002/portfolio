import { useState, useRef, useCallback } from "react";

export const useWindowManager = () => {
  const [openWindows, setOpenWindows] = useState({});
  const [windowStates, setWindowStates] = useState({});
  const [zIndexCounter, setZIndexCounter] = useState(1000);
  const [showDesktopMode, setShowDesktopMode] = useState(false);
  const [previousWindowStates, setPreviousWindowStates] = useState({});
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);

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
            minWidth: 300,
            minHeight: 200,
            maxWidth: window.innerWidth - 50,
            maxHeight: window.innerHeight - 100,
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
        x: Math.max(
          0,
          Math.min(x, window.innerWidth - (prev[windowId]?.width || 300))
        ),
        y: Math.max(
          32,
          Math.min(y, window.innerHeight - (prev[windowId]?.height || 200))
        ),
      },
    }));
  };

  const updateWindowSize = (windowId, width, height) => {
    setWindowStates((prev) => {
      const currentState = prev[windowId];
      if (!currentState) return prev;

      const newWidth = Math.max(
        currentState.minWidth || 300,
        Math.min(width, currentState.maxWidth || window.innerWidth - 50)
      );
      const newHeight = Math.max(
        currentState.minHeight || 200,
        Math.min(height, currentState.maxHeight || window.innerHeight - 100)
      );

      return {
        ...prev,
        [windowId]: {
          ...currentState,
          width: newWidth,
          height: newHeight,
        },
      };
    });
  };

  // Enhanced resize functionality
  const startResize = useCallback(
    (windowId, handle, event) => {
      event.preventDefault();
      event.stopPropagation();

      setIsResizing(true);
      setResizeHandle({ windowId, handle });

      const currentState = windowStates[windowId];
      if (!currentState) return;

      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = currentState.width;
      const startHeight = currentState.height;
      const startLeft = currentState.x;
      const startTop = currentState.y;

      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newX = startLeft;
        let newY = startTop;

        // Calculate new dimensions based on resize handle
        switch (handle) {
          case "se": // Bottom-right
            newWidth = startWidth + deltaX;
            newHeight = startHeight + deltaY;
            break;
          case "sw": // Bottom-left
            newWidth = startWidth - deltaX;
            newHeight = startHeight + deltaY;
            newX = startLeft + deltaX;
            break;
          case "ne": // Top-right
            newWidth = startWidth + deltaX;
            newHeight = startHeight - deltaY;
            newY = startTop + deltaY;
            break;
          case "nw": // Top-left
            newWidth = startWidth - deltaX;
            newHeight = startHeight - deltaY;
            newX = startLeft + deltaX;
            newY = startTop + deltaY;
            break;
          case "n": // Top
            newHeight = startHeight - deltaY;
            newY = startTop + deltaY;
            break;
          case "s": // Bottom
            newHeight = startHeight + deltaY;
            break;
          case "e": // Right
            newWidth = startWidth + deltaX;
            break;
          case "w": // Left
            newWidth = startWidth - deltaX;
            newX = startLeft + deltaX;
            break;
        }

        // Apply constraints
        const minWidth = currentState.minWidth || 300;
        const minHeight = currentState.minHeight || 200;
        const maxWidth = currentState.maxWidth || window.innerWidth - 50;
        const maxHeight = currentState.maxHeight || window.innerHeight - 100;

        newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
        newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

        // Adjust position if we hit minimum size constraints
        if (handle.includes("w") && newWidth === minWidth) {
          newX = startLeft + startWidth - minWidth;
        }
        if (handle.includes("n") && newHeight === minHeight) {
          newY = startTop + startHeight - minHeight;
        }

        // Ensure window stays within screen bounds
        newX = Math.max(0, Math.min(newX, window.innerWidth - newWidth));
        newY = Math.max(32, Math.min(newY, window.innerHeight - newHeight));

        setWindowStates((prev) => ({
          ...prev,
          [windowId]: {
            ...prev[windowId],
            width: newWidth,
            height: newHeight,
            x: newX,
            y: newY,
          },
        }));
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        setResizeHandle(null);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [windowStates]
  );

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
    isResizing,
    resizeHandle,
    toggleWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
    startResize,
    // Shortcut functions
    minimizeAllWindows,
    closeAllWindows,
    restoreAllWindows,
    toggleShowDesktop,
  };
};
