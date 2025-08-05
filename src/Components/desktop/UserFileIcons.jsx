import { FileText, ImageIcon, Code, Music } from "lucide-react";

const UserFileIcon = ({ file }) => {
  const getFileIcon = (type) => {
    switch (type) {
      case "text":
        return <FileText className="w-6 h-6" />;
      case "image":
        return <ImageIcon className="w-6 h-6" />;
      case "code":
        return <Code className="w-6 h-6" />;
      case "audio":
        return <Music className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <div className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 group-hover:bg-opacity-20 transition-all duration-300">
        <div className="text-white">{getFileIcon(file.type)}</div>
      </div>
      <span className="text-white text-xs mt-1 max-w-16 truncate">
        {file.name}
      </span>
    </div>
  );
};

export default UserFileIcon;
