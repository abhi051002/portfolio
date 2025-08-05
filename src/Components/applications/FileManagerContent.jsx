import { FileText, Code, Image, Music, ExternalLink } from "lucide-react";

const FileManagerContent = ({ files = [] }) => {
  // Add your resume file to the files array
  const resumeFile = {
    id: "resume-pdf",
    name: "AbhijitNanda_Resume.pdf",
    type: "pdf",
    created: new Date("2024-01-15"), // You can adjust this date
    url: "https://res.cloudinary.com/dzncl0gbm/image/upload/v1744692517/Abhijit_Nanda_Resume_cxsobk.pdf",
    size: "245.7", // You can adjust the size
  };

  // Combine the resume with other files
  const allFiles = [resumeFile, ...files];

  const handleFileClick = (file) => {
    if (file.url) {
      window.open(file.url, "_blank");
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "text":
        return <FileText className="w-5 h-5 text-blue-400" />;
      case "code":
        return <Code className="w-5 h-5 text-green-400" />;
      case "image":
        return <Image className="w-5 h-5 text-purple-400" />;
      case "audio":
        return <Music className="w-5 h-5 text-pink-400" />;
      case "pdf":
        return <FileText className="w-5 h-5 text-red-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">File Manager</h2>
        <p className="text-gray-300">Manage your created files</p>
      </div>

      {allFiles.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No files created yet</p>
          <p className="text-gray-500 text-sm">
            Use the "New File" button on the desktop to create files
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {allFiles.map((file) => (
            <div
              key={file.id}
              className="bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600 border-opacity-50 hover:bg-opacity-70 transition-all duration-200 cursor-pointer group"
              onClick={() => handleFileClick(file)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 bg-opacity-20 rounded">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <div className="text-white font-medium flex items-center space-x-2">
                      <span>{file.name}</span>
                      {file.url && (
                        <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {file.type} • Created {file.created.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-gray-500 text-sm">
                  {file.size || (Math.random() * 100).toFixed(1)} KB
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileManagerContent;
