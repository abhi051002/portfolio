import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { Link } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import Loader from "../components/Loader/Loader";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaImage } from "react-icons/fa";

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const ProjectCard = ({ project, onClick }) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    initial="rest"
    animate="rest"
    onClick={() => onClick(project)}
    className="group cursor-pointer glass-card rounded-2xl overflow-hidden flex flex-col"
  >
    <div className="relative h-44 overflow-hidden">
      {project.image ? (
        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-violet-900/20"><FaImage size={36} className="text-violet-600/50" /></div>
      )}
      <motion.div variants={overlayVariants} className="absolute inset-0 flex items-center justify-center gap-3" style={{ background: "rgba(3,2,15,0.75)", backdropFilter: "blur(4px)" }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-white hover:bg-violet-600/70 transition-colors">
          <FaGithub size={16} />
        </a>
        {project.webapp && (
          <a href={project.webapp} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-white hover:bg-cyan-600/70 transition-colors">
            <FaExternalLinkAlt size={13} />
          </a>
        )}
      </motion.div>
      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
          style={{ background: "rgba(3,2,15,0.7)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)", backdropFilter: "blur(4px)" }}>
          {project.category}
        </span>
      </div>
    </div>
    <div className="flex flex-col flex-1 p-5">
      <h3 className="font-bold text-white text-sm mb-2 group-hover:text-violet-300 transition-colors">{project.title}</h3>
      <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {(project.tags || []).slice(0, 4).map((tag) => <span key={tag} className="tag">{tag}</span>)}
        {(project.tags || []).length > 4 && <span className="tag text-slate-500">+{project.tags.length - 4}</span>}
      </div>
    </div>
  </motion.div>
);

const ProjectsPage = () => {
  const { projects, loading, fetchProjects, portfolioId } = usePortfolio();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (portfolioId && projects.length === 0) fetchProjects();
  }, [portfolioId, projects.length, fetchProjects]);

  const categories = ["all", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-400 text-sm font-medium transition-colors mb-10 group">
          <FaArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <SectionHeading label="Portfolio" title="All" highlight="Projects" subtitle="Every project I've shipped — from solo experiments to team products." />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium border capitalize transition-all duration-300 ${filter === cat ? "bg-violet-600 border-violet-500 text-white" : "glass border-white/8 text-slate-400 hover:text-white hover:border-violet-500/40"}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading.projects ? <Loader text="Loading projects..." size="50px" minHeight="300px" /> : (
          <AnimatePresence mode="wait">
            <motion.div key={filter} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }}>
              {filtered.map((p, i) => <ProjectCard key={p._id || i} project={p} onClick={setSelected} />)}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Simple modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(3,2,15,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
              style={{ background: "rgba(13,13,32,0.97)", border: "1px solid rgba(124,58,237,0.25)" }}
            >
              {selected.image && <div className="h-52 overflow-hidden flex-shrink-0"><img src={selected.image} alt={selected.title} className="w-full h-full object-cover" /></div>}
              <div className="flex-1 overflow-y-auto p-6">
                <h2 className="text-xl font-bold text-white mb-1">{selected.title}</h2>
                {selected.date && <p className="text-slate-500 text-xs mb-4">{selected.date}</p>}
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4">{selected.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">{(selected.tags || []).map((t) => <span key={t} className="tag">{t}</span>)}</div>
                <div className="flex gap-3">
                  {selected.github && <a href={selected.github} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 justify-center text-sm py-2.5"><FaGithub size={14} /> GitHub</a>}
                  {selected.webapp && <a href={selected.webapp} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center text-sm py-2.5"><span className="flex items-center gap-2"><FaExternalLinkAlt size={11} /> Live Demo</span></a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
