"use client";

import { useState } from "react";
import { FileText, Code, ImageIcon, Music } from "lucide-react";

const FileCreatorMenu = ({ onCreateFile, onClose }) => {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("text");

  const handleCreate = () => {
    if (fileName.trim()) {
      onCreateFile(fileName.trim(), fileType);
      setFileName("");
    }
  };

  const fileTypes = [
    {
      value: "text",
      label: "Text File",
      icon: <FileText className="w-4 h-4" />,
    },
    { value: "code", label: "Code File", icon: <Code className="w-4 h-4" /> },
    { value: "image", label: "Image", icon: <ImageIcon className="w-4 h-4" /> },
    { value: "audio", label: "Audio", icon: <Music className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-white font-medium text-sm">Create New File</h3>
      <input
        type="text"
        placeholder="File name..."
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none text-sm"
        onKeyPress={(e) => e.key === "Enter" && handleCreate()}
      />
      <div className="space-y-1">
        {fileTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setFileType(type.value)}
            className={`w-full flex items-center space-x-2 px-3 py-2 rounded transition-colors text-sm ${
              fileType === type.value
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {type.icon}
            <span>{type.label}</span>
          </button>
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleCreate}
          disabled={!fileName.trim()}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          Create
        </button>
        <button
          onClick={onClose}
          className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FileCreatorMenu;
