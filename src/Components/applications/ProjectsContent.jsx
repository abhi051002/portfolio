import { projects } from "../../data/constants.js";
const ProjectsContent = () => {
  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">My Projects</h2>
        <p className="text-gray-300">
          Here are some of the projects I've been working on
        </p>
      </div>
      <div className="grid gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-600 border-opacity-50 hover:bg-opacity-70 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3
                className="cursor-pointer font-bold text-xl text-white group-hover:text-blue-300 transition-colors"
                onClick={() => {
                  window.open(
                    project.isDone ? project.webapp : project.github,
                    "_blank"
                  );
                }}
              >
                {project.title}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.isDone
                    ? "bg-green-500 bg-opacity-20 text-green-300"
                    : "bg-yellow-500 bg-opacity-20 text-yellow-300"
                }`}
              >
                {project.isDone ? "Completed" : "Working on it"}
              </span>
            </div>
            <p className="text-gray-300 mb-3 leading-relaxed line-clamp-3">
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                <span className="font-semibold">Tech Stack:</span>{" "}
                {project.tags.join(" , ")}
              </div>
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`}
              ></div>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="text-sm text-gray-400 font-semibold">Code:</div>
              <a
                href={project.github}
                target="_blank"
                className="text-sm text-gray-400 hover:underline hover:text-blue-400"
              >
                {project.github}
              </a>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="text-sm text-gray-400 font-semibold">Demo:</div>
              <a
                href={project.webapp}
                target="_blank"
                className="text-sm text-gray-400 hover:underline hover:text-blue-400"
              >
                {project.webapp}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
