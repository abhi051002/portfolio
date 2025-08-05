import { Terminal, Chrome, FolderOpen, FileText, File } from "lucide-react";

const Taskbar = ({
  currentTime,
  openWindows,
  windowStates,
  onMinimizeWindow,
  onRestoreWindow,
}) => {
  // Icon mapping for different window types
  const getWindowIcon = (windowType) => {
    const iconProps = { className: "w-4 h-4" };

    switch (windowType) {
      case "terminal":
        return <Terminal {...iconProps} />;
      case "browser":
        return <Chrome {...iconProps} />;
      case "projects":
        return <FolderOpen {...iconProps} />;
      case "files":
        return <File {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="absolute bottom-0 left-16 right-0 h-12 bg-gray-900 border-t border-gray-700 flex items-center justify-between px-4 shadow-lg z-30">
      {/* Left side - Application windows */}
      <div className="flex items-center space-x-2">
        {Object.entries(openWindows).map(
          ([window, isOpen]) =>
            isOpen && (
              <button
                key={window}
                className={`px-2 py-1.5 rounded text-sm capitalize transition-all duration-200 flex items-center space-x-2 ${
                  windowStates[window]?.isMinimized
                    ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    : "bg-orange-600 text-white hover:bg-orange-500 shadow-md"
                }`}
                onClick={() =>
                  windowStates[window]?.isMinimized
                    ? onRestoreWindow(window)
                    : onMinimizeWindow(window)
                }
                title={window} // Show window name as tooltip
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    windowStates[window]?.isMinimized
                      ? "bg-gray-500"
                      : "bg-white"
                  }`}
                ></div>
                {getWindowIcon(window)}
              </button>
            )
        )}
      </div>

      {/* Right side - System info */}
      <div className="flex items-center space-x-4 text-gray-300 text-sm">
        <div className="flex items-center space-x-2">
          <span>{formatDate(currentTime)}</span>
          <span className="text-gray-500">•</span>
          <span className="font-mono">{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
