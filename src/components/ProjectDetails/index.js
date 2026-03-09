import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { modalOverlay, modalContent } from "../../animations/variants";

const ProjectDetails = ({ openModal, setOpenModal }) => {
  const { state, project } = openModal;
  const close = () => setOpenModal({ state: false, project: null });

  return (
    <AnimatePresence>
      {state && project && (
        <motion.div
          variants={modalOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(3,2,15,0.85)", backdropFilter: "blur(12px)" }}
          onClick={close}
        >
          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(13,13,32,0.97)",
              border: "1px solid rgba(124,58,237,0.25)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(124,58,237,0.1)",
            }}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full glass-strong flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>

            {/* Image */}
            {project.image && (
              <div className="h-52 sm:h-60 overflow-hidden flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 h-52 sm:h-60" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(13,13,32,0.97) 100%)" }} />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{project.title}</h2>
                  {project.date && <p className="text-slate-500 text-sm mt-0.5">{project.date}</p>}
                </div>
                <span className="tag capitalize flex-shrink-0">{project.category}</span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{project.description}</p>

              {/* Tags */}
              {project.tags && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex gap-3 pt-2">
                {project.github && (
                  <a
                    href={project.github} target="_blank" rel="noopener noreferrer"
                    className="btn-outline flex-1 justify-center text-sm py-2.5"
                  >
                    <FaGithub size={15} /> GitHub
                  </a>
                )}
                {project.webapp && (
                  <a
                    href={project.webapp} target="_blank" rel="noopener noreferrer"
                    className="btn-primary flex-1 justify-center text-sm py-2.5"
                  >
                    <span className="flex items-center gap-2">
                      <FaExternalLinkAlt size={12} /> Live Demo
                    </span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetails;
