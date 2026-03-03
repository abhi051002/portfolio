import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="glass rounded-2xl overflow-hidden cursor-pointer group hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300"
    onClick={onClick}
  >
    {/* Project image */}
    <div className="relative overflow-hidden h-48">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.style.background = "linear-gradient(135deg, #7c3aed22, #06b6d422)";
          e.target.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
          View Details
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags?.slice(0, 4).map((tag, i) => (
          <span
            key={i}
            className="text-xs px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-md"
          >
            {tag}
          </span>
        ))}
        {project.tags?.length > 4 && (
          <span className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-slate-400 rounded-md">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <FaGithub size={14} /> Code
          </a>
        )}
        {project.webapp && (
          <a
            href={project.webapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            <FaExternalLinkAlt size={12} /> Live Demo
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Project = ({ openModal, setOpenModal }) => {
  const { projects, loading, fetchProjects } = usePortfolio();

  useEffect(() => {
    if (projects.length === 0) fetchProjects();
  }, [projects.length, fetchProjects]);

  return (
    <section id="apps" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            A showcase of the things I've built
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        {loading.projects ? (
          <Loader text="Loading projects..." size="60px" minHeight="400px" />
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...projects]
              .sort((a, b) => b.id - a.id)
              .map((project, index) => (
                <ProjectCard
                  key={project._id || index}
                  project={project}
                  onClick={() => setOpenModal({ state: true, project })}
                />
              ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-10">No projects found</p>
        )}
      </div>
    </section>
  );
};

export default Project;