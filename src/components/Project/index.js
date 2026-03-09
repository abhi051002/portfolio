import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionHeading from "../ui/SectionHeading";
import Loader from "../Loader/Loader";
import { FaGithub, FaExternalLinkAlt, FaImage } from "react-icons/fa";

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.35 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const ProjectCard = ({ project, onClick }) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    initial="rest"
    animate="rest"
    onClick={() => onClick(project)}
    className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden glass-card hover:border-violet-500/40 transition-all duration-400"
  >
    {/* Image */}
    <div className="relative overflow-hidden h-48">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-violet-900/20">
          <FaImage size={40} className="text-violet-600/50" />
        </div>
      )}

      {/* Hover overlay */}
      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 flex items-center justify-center gap-4"
        style={{ background: "rgba(3,2,15,0.75)", backdropFilter: "blur(4px)" }}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-violet-600/60 transition-colors"
        >
          <FaGithub size={16} />
        </a>
        {project.webapp && (
          <a
            href={project.webapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-cyan-600/60 transition-colors"
          >
            <FaExternalLinkAlt size={14} />
          </a>
        )}
      </motion.div>

      {/* Category badge */}
      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{ background: "rgba(3,2,15,0.7)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.35)", backdropFilter: "blur(4px)" }}>
          {project.category}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-5">
      <h3 className="font-bold text-white text-base mb-2 group-hover:text-violet-300 transition-colors">{project.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {(project.tags || []).slice(0, 5).map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
        {(project.tags || []).length > 5 && (
          <span className="tag text-slate-500">+{project.tags.length - 5}</span>
        )}
      </div>
    </div>
  </motion.div>
);

const Project = ({ openModal, setOpenModal }) => {
  const { projects, loading, fetchProjects, portfolioId } = usePortfolio();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (portfolioId && projects.length === 0) fetchProjects();
  }, [portfolioId, projects.length, fetchProjects]);

  const categories = ["all", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const filtered = filter === "all" ? projects.slice(0, 3) : projects.filter((p) => p.category === filter).slice(0, 3);

  return (
    <section id="apps" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Portfolio"
          title="Featured"
          highlight="Projects"
          subtitle="Some of the products and applications I've proudly shipped."
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border capitalize transition-all duration-300 ${
                filter === cat
                  ? "bg-violet-600 border-violet-500 text-white shadow-neon-sm"
                  : "glass border-white/8 text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading.projects ? (
          <Loader text="Loading projects..." size="50px" minHeight="300px" />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.12 }}
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project._id || i}
                  project={project}
                  onClick={(p) => setOpenModal({ state: true, project: p })}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {projects.length > 3 && (
          <div className="text-center mt-10">
            <a href="/projects" className="btn-outline">
              View All Projects →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;