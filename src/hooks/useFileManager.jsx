import { useState } from "react";

export const useFileManager = () => {
  const [userFiles, setUserFiles] = useState([]);
  const [showFileCreator, setShowFileCreator] = useState(false);

  const createFile = (name, type) => {
    const newFile = {
      id: Date.now(),
      name,
      type,
      created: new Date(),
      content: type === "text" ? "New file content..." : "",
    };
    setUserFiles((prev) => [...prev, newFile]);
    setShowFileCreator(false);
  };

  return {
    userFiles,
    showFileCreator,
    setShowFileCreator,
    createFile,
  };
};
