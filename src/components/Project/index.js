import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
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
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#030712]/90 via-transparent to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-violet-600/10 dark:bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-slate-900 dark:text-white font-semibold text-sm bg-white/60 dark:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 dark:border-white/30">
          View Details
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags?.slice(0, 4).map((tag, i) => (
          <span
            key={i}
            className="text-xs px-2 py-0.5 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 rounded-md"
          >
            {tag}
          </span>
        ))}
        {project.tags?.length > 4 && (
          <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 rounded-md">
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
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <FaGithub size={14} /> Code
          </a>
        )}
        {project.webapp && (
          <a
            href={project.webapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors"
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
  const location = useLocation();
  const isHome = location.pathname === "/";

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
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-lg mx-auto">
            A showcase of the things I've built
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        {loading.projects ? (
          <Loader text="Loading projects..." size="60px" minHeight="400px" />
        ) : projects && projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...projects]
                .sort((a, b) => b.id - a.id)
                .slice(0, isHome ? 3 : projects.length)
                .map((project, index) => (
                <ProjectCard
                  key={project._id || index}
                  project={project}
                  onClick={() => setOpenModal({ state: true, project })}
                />
              ))}
            </div>
            {isHome && projects.length > 3 && (
              <div className="mt-12 flex justify-center">
                <Link
                  to="/projects"
                  onClick={() => window.scrollTo(0, 0)}
                  className="px-8 py-3 bg-slate-100 dark:bg-white/5 border border-violet-500/30 hover:bg-violet-100 dark:hover:bg-violet-500/10 hover:border-violet-500 text-violet-600 dark:text-violet-400 hover:text-slate-900 dark:hover:text-white font-semibold rounded-xl transition-all duration-300 shadow-lg"
                >
                  Show All Projects
                </Link>
              </div>
            )}
          </>
        ) : (
          <p className="text-slate-400 text-center py-10">No projects found</p>
        )}
      </div>
    </section>
  );
};

export default Project;