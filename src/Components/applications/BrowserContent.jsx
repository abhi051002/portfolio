const BrowserContent = () => (
  <div className="h-full bg-white text-gray-800">
    {/* Browser UI */}
    <div className="bg-gray-100 border-b p-3 flex items-center space-x-3">
      <div className="flex space-x-1">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
        🔒 https://portfolio.dev/about
      </div>
    </div>

    {/* Content */}
    <div className="p-6 space-y-6 h-full overflow-auto">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
          JD
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          John Developer
        </h1>
        <p className="text-gray-600">Full Stack Developer & Creative Thinker</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-3 text-indigo-800">About Me</h3>
          <p className="text-gray-700 leading-relaxed">
            Passionate developer with expertise in modern web technologies. I
            love creating beautiful, functional applications that solve
            real-world problems.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-3 text-purple-800">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "Python", "TypeScript", "MongoDB", "AWS"].map(
              (skill) => (
                <span
                  key={skill}
                  className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-green-800">Experience</h3>
        <div className="space-y-3">
          <div className="border-l-4 border-green-500 pl-4">
            <div className="font-semibold text-green-800">
              Senior Frontend Developer
            </div>
            <div className="text-green-600 text-sm">
              TechCorp Inc. • 2022-Present
            </div>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="font-semibold text-blue-800">
              Full Stack Developer
            </div>
            <div className="text-blue-600 text-sm">StartupXYZ • 2021-2022</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BrowserContent;
