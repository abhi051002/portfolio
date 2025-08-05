import React, { useRef, useEffect, useState } from "react";
import { Minus, Square, X, Maximize2 } from "lucide-react";

const ResizableWindow = ({
  windowId,
  title,
  children,
  windowState,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  onBringToFront,
  onUpdatePosition,
  onUpdateSize,
  onStartResize,
  isResizing,
  resizeHandle,
}) => {
  const windowRef = useRef(null);
  const headerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  if (!isOpen || !windowState) return null;

  const { x, y, width, height, isMaximized, isMinimized, zIndex } = windowState;

  // Handle window dragging
  const handleMouseDown = (e) => {
    if (
      e.target === headerRef.current ||
      headerRef.current?.contains(e.target)
    ) {
      if (e.target.closest("button")) return; // Don't drag when clicking buttons

      setIsDragging(true);
      onBringToFront(windowId);

      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !isMaximized) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        onUpdatePosition(windowId, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, windowId, onUpdatePosition, isMaximized]);

  // Handle double-click to maximize/restore
  const handleDoubleClick = () => {
    onMaximize(windowId);
  };

  // Resize handle component
  const ResizeHandle = ({ position, cursor }) => (
    <div
      className={`absolute bg-transparent hover:bg-blue-500 hover:bg-opacity-30 transition-colors ${
        position === "se"
          ? "bottom-0 right-0 w-3 h-3 cursor-se-resize"
          : position === "sw"
          ? "bottom-0 left-0 w-3 h-3 cursor-sw-resize"
          : position === "ne"
          ? "top-0 right-0 w-3 h-3 cursor-ne-resize"
          : position === "nw"
          ? "top-0 left-0 w-3 h-3 cursor-nw-resize"
          : position === "n"
          ? "top-0 left-3 right-3 h-1 cursor-n-resize"
          : position === "s"
          ? "bottom-0 left-3 right-3 h-1 cursor-s-resize"
          : position === "e"
          ? "right-0 top-3 bottom-3 w-1 cursor-e-resize"
          : position === "w"
          ? "left-0 top-3 bottom-3 w-1 cursor-w-resize"
          : ""
      } ${
        isResizing && resizeHandle?.handle === position
          ? "bg-blue-500 bg-opacity-50"
          : ""
      }`}
      onMouseDown={(e) => onStartResize(windowId, position, e)}
      style={{ zIndex: 10 }}
    />
  );

  const windowStyle = {
    left: x,
    top: y,
    width: isMaximized ? "100vw" : width,
    height: isMaximized ? "calc(100vh - 32px)" : height,
    zIndex,
    transform: isMaximized ? "translate(0, 0)" : "none",
    position: "fixed",
  };

  if (isMinimized) {
    windowStyle.display = "none";
  }

  return (
    <div
      ref={windowRef}
      className={`bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden ${
        isDragging ? "cursor-grabbing" : ""
      } ${isMaximized ? "rounded-none" : ""}`}
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 flex items-center justify-between cursor-grab ${
          isDragging ? "cursor-grabbing" : ""
        } ${isMaximized ? "cursor-default" : ""}`}
        onDoubleClick={handleDoubleClick}
      >
        <span className="text-sm font-medium truncate flex-1">{title}</span>
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={() => onMinimize(windowId)}
            className="p-1 hover:bg-blue-400 hover:bg-opacity-50 rounded transition-colors"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={() => onMaximize(windowId)}
            className="p-1 hover:bg-blue-400 hover:bg-opacity-50 rounded transition-colors"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <Square className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </button>
          <button
            onClick={() => onClose(windowId)}
            className="p-1 hover:bg-red-400 hover:bg-opacity-50 rounded transition-colors"
            title="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white">{children}</div>

      {/* Resize Handles - Only show if not maximized */}
      {!isMaximized && (
        <>
          {/* Corner handles */}
          <ResizeHandle position="se" />
          <ResizeHandle position="sw" />
          <ResizeHandle position="ne" />
          <ResizeHandle position="nw" />

          {/* Edge handles */}
          <ResizeHandle position="n" />
          <ResizeHandle position="s" />
          <ResizeHandle position="e" />
          <ResizeHandle position="w" />
        </>
      )}

      {/* Resize indicator when actively resizing */}
      {isResizing && resizeHandle?.windowId === windowId && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded pointer-events-none">
          {width} × {height}
        </div>
      )}
    </div>
  );
};

export default ResizableWindow;
