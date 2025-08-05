import { Maximize, Maximize2, Minimize, X } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";

const DraggableWindow = ({
  windowId,
  title,
  icon,
  children,
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onBringToFront,
  onUpdatePosition,
  onUpdateSize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleMouseDown = (e) => {
    if (
      e.target.closest(".window-controls") ||
      e.target.closest(".resize-handle")
    )
      return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - windowState.x,
      y: e.clientY - windowState.y,
    });
    onBringToFront();
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowState.width,
      height: windowState.height,
    });
    onBringToFront();
  };

  const handleMouseMove = (e) => {
    if (isDragging && !windowState.isMaximized) {
      const newX = Math.max(
        0,
        Math.min(window.innerWidth - windowState.width, e.clientX - dragStart.x)
      );
      const newY = Math.max(
        0,
        Math.min(
          window.innerHeight - windowState.height - 56,
          e.clientY - dragStart.y
        )
      );
      onUpdatePosition(windowId, newX, newY);
    }

    if (isResizing && !windowState.isMaximized) {
      const newWidth = Math.max(
        400,
        resizeStart.width + (e.clientX - resizeStart.x)
      );
      const newHeight = Math.max(
        300,
        resizeStart.height + (e.clientY - resizeStart.y)
      );
      onUpdateSize(windowId, newWidth, newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart]);

  if (windowState.isMinimized) {
    return null;
  }

  const windowStyle = windowState.isMaximized
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 56px)",
        zIndex: windowState.zIndex,
      }
    : {
        position: "absolute",
        top: windowState.y,
        left: windowState.x,
        width: windowState.width,
        height: windowState.height,
        zIndex: windowState.zIndex,
      };

  return (
    <div
      style={windowStyle}
      className="bg-gray-800 bg-opacity-95 backdrop-blur-sm border border-gray-600 border-opacity-50 rounded-xl shadow-2xl select-none overflow-hidden"
      onMouseDown={onBringToFront}
    >
      {/* Enhanced Window Header */}
      <div
        className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-3 rounded-t-xl flex items-center justify-between cursor-move border-b border-gray-600 border-opacity-50"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="text-sm font-medium truncate">{title}</span>
        </div>
        <div className="flex space-x-2 window-controls">
          <button
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
            onClick={onMinimize}
            title="Minimize"
          >
            <span className="text-gray-800 text-sm">-</span>
          </button>
          <button
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
            onClick={onMaximize}
            title={windowState.isMaximized ? "Restore" : "Maximize"}
          >
            {windowState.isMaximized ? (
              <Maximize2 size={10} className="text-gray-800" strokeWidth={3} />
            ) : (
              <Maximize size={10} className="text-gray-800" strokeWidth={3} />
            )}
          </button>
          <button
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
            onClick={onClose}
            title="Close"
          >
            <X size={10} className="text-gray-800" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="h-full overflow-auto text-white"
        style={{ height: "calc(100% - 52px)" }}
      >
        {children}
      </div>

      {/* Enhanced Resize Handle */}
      {!windowState.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-nw-resize resize-handle group"
          onMouseDown={handleResizeMouseDown}
        >
          <div className="absolute bottom-1 right-1 w-0 h-0 border-l-4 border-b-4 border-gray-500 group-hover:border-blue-400 transition-colors"></div>
          <div className="absolute bottom-0.5 right-0.5 w-0 h-0 border-l-2 border-b-2 border-gray-600 group-hover:border-blue-500 transition-colors"></div>
        </div>
      )}
    </div>
  );
};

export default DraggableWindow;
