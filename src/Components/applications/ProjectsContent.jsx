const ProjectsContent = () => {
  const projects = [
    {
      name: "E-commerce Platform",
      tech: "React, Node.js, MongoDB",
      description: "Full-featured online store with payment integration",
      status: "Completed",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Task Management App",
      tech: "React, Firebase, Tailwind",
      description: "Collaborative project management tool",
      status: "In Progress",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Weather Dashboard",
      tech: "JavaScript, API, Chart.js",
      description: "Real-time weather data visualization",
      status: "Completed",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Social Media Analytics",
      tech: "Python, Django, PostgreSQL",
      description: "Analytics dashboard for social media metrics",
      status: "Planning",
      color: "from-orange-500 to-red-500",
    },
  ];

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
              <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                {project.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === "Completed"
                    ? "bg-green-500 bg-opacity-20 text-green-300"
                    : project.status === "In Progress"
                    ? "bg-yellow-500 bg-opacity-20 text-yellow-300"
                    : "bg-gray-500 bg-opacity-20 text-gray-300"
                }`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-gray-300 mb-3 leading-relaxed">
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                <span className="font-medium">Tech Stack:</span> {project.tech}
              </div>
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
