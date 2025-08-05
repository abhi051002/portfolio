import React from "react";
import {
  Terminal,
  Chrome,
  FolderOpen,
  FileText,
  Plus,
  File,
} from "lucide-react";
import UserFileIcon from "./UserFileIcons";
import FileCreatorMenu from "./FileCreaterMenu";
import PDFImage from "../../Image/pdf.png";

const DesktopIcons = ({
  onToggleWindow,
  userFiles,
  showFileCreator,
  setShowFileCreator,
  createFile,
}) => {

  return (
    <>
      {/* Left Sidebar with Desktop Icons - Ubuntu Style */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gray-900 border-r border-gray-700 flex flex-col items-center py-4 space-y-4 z-20">
        <UbuntuDesktopIcon
          icon={<Terminal className="w-6 h-6" />}
          label="Terminal"
          onClick={() => onToggleWindow("terminal")}
        />
        <UbuntuDesktopIcon
          icon={<Chrome className="w-6 h-6" />}
          label="Browser"
          onClick={() => onToggleWindow("browser")}
        />
        <UbuntuDesktopIcon
          icon={<FolderOpen className="w-6 h-6" />}
          label="Projects"
          onClick={() => onToggleWindow("projects")}
        />
        <UbuntuDesktopIcon
          icon={<FileText className="w-6 h-6" />}
          label="Files"
          onClick={() => onToggleWindow("files")}
        />

        {/* Separator */}
        {/* <div className="w-8 h-px bg-gray-700 my-2"></div> */}

        {/* Create File Button */}
        {/* <div className="relative">
          <UbuntuDesktopIcon
            icon={<Plus className="w-6 h-6" />}
            label="New File"
            onClick={() => setShowFileCreator(!showFileCreator)}
            isActive={showFileCreator}
          />

          {showFileCreator && (
            <div className="absolute left-16 top-0 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-lg p-3 min-w-48 border border-gray-600 shadow-xl z-30">
              <FileCreatorMenu
                onCreateFile={createFile}
                onClose={() => setShowFileCreator(false)}
              />
            </div>
          )}
        </div> */}
      </div>

      {/* User Created Files - positioned in main desktop area */}
      <div className="absolute top-4 right-4 space-y-4 z-10">
        {userFiles.slice(0, 5).map((file) => (
          <UserFileIcon key={file.id} file={file} />
        ))}
      </div>
    </>
  );
};

// Ubuntu-style Desktop Icon Component
const UbuntuDesktopIcon = ({ icon, label, onClick, isActive = false }) => (
  <div
    className={`group relative flex flex-col items-center cursor-pointer transition-all duration-200 p-2 rounded-lg ${
      isActive ? "bg-orange-500 bg-opacity-20" : "hover:bg-gray-700"
    }`}
    onClick={onClick}
    title={label}
  >
    <div
      className={`transition-all duration-200 ${
        isActive ? "text-orange-400" : "text-gray-300 group-hover:text-white"
      }`}
    >
      {icon}
    </div>

    {/* Active indicator */}
    {isActive && (
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r"></div>
    )}

    {/* Tooltip */}
    <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
      {label}
    </div>
  </div>
);

export default DesktopIcons;
