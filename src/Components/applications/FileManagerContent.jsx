import { FileText, Code, ImageIcon, Music } from "lucide-react";

const FileManagerContent = ({ files }) => (
  <div className="p-6 h-full overflow-auto">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white mb-2">File Manager</h2>
      <p className="text-gray-300">Manage your created files</p>
    </div>
    {files.length === 0 ? (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">No files created yet</p>
        <p className="text-gray-500 text-sm">
          Use the "New File" button on the desktop to create files
        </p>
      </div>
    ) : (
      <div className="grid gap-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600 border-opacity-50 hover:bg-opacity-70 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 bg-opacity-20 rounded">
                  {file.type === "text" && (
                    <FileText className="w-5 h-5 text-blue-400" />
                  )}
                  {file.type === "code" && (
                    <Code className="w-5 h-5 text-green-400" />
                  )}
                  {file.type === "image" && (
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                  )}
                  {file.type === "audio" && (
                    <Music className="w-5 h-5 text-pink-400" />
                  )}
                </div>
                <div>
                  <div className="text-white font-medium">{file.name}</div>
                  <div className="text-gray-400 text-sm">
                    {file.type} • Created {file.created.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-gray-500 text-sm">
                {(Math.random() * 100).toFixed(1)} KB
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default FileManagerContent;
