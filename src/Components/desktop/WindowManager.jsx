"use client";

import { Terminal, Chrome, FolderOpen, FileText } from "lucide-react";
import DraggableWindow from "./DraggableWindow";
import TerminalContent from "../applications/TerminalContent";
import BrowserContent from "../applications/BrowserContent";
import ProjectsContent from "../applications/ProjectsContent";
import FileManagerContent from "../applications/FileManagerContent";

const WindowManager = ({ windowManager, userFiles }) => {
  const {
    openWindows,
    windowStates,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
  } = windowManager;

  return (
    <>
      {openWindows.terminal && windowStates.terminal && (
        <DraggableWindow
          windowId="terminal"
          title="Terminal"
          icon={<Terminal className="w-4 h-4" />}
          windowState={windowStates.terminal}
          onClose={() => closeWindow("terminal")}
          onMinimize={() => minimizeWindow("terminal")}
          onMaximize={() => maximizeWindow("terminal")}
          onBringToFront={() => bringToFront("terminal")}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
        >
          <TerminalContent />
        </DraggableWindow>
      )}

      {openWindows.browser && windowStates.browser && (
        <DraggableWindow
          windowId="browser"
          title="Browser - About Me"
          icon={<Chrome className="w-4 h-4" />}
          windowState={windowStates.browser}
          onClose={() => closeWindow("browser")}
          onMinimize={() => minimizeWindow("browser")}
          onMaximize={() => maximizeWindow("browser")}
          onBringToFront={() => bringToFront("browser")}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
        >
          <BrowserContent />
        </DraggableWindow>
      )}

      {openWindows.projects && windowStates.projects && (
        <DraggableWindow
          windowId="projects"
          title="Projects"
          icon={<FolderOpen className="w-4 h-4" />}
          windowState={windowStates.projects}
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
          onMaximize={() => maximizeWindow("projects")}
          onBringToFront={() => bringToFront("projects")}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
        >
          <ProjectsContent />
        </DraggableWindow>
      )}

      {openWindows.files && windowStates.files && (
        <DraggableWindow
          windowId="files"
          title="File Manager"
          icon={<FileText className="w-4 h-4" />}
          windowState={windowStates.files}
          onClose={() => closeWindow("files")}
          onMinimize={() => minimizeWindow("files")}
          onMaximize={() => maximizeWindow("files")}
          onBringToFront={() => bringToFront("files")}
          onUpdatePosition={updateWindowPosition}
          onUpdateSize={updateWindowSize}
        >
          <FileManagerContent files={userFiles} />
        </DraggableWindow>
      )}
    </>
  );
};

export default WindowManager;
