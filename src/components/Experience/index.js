import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionHeading from "../ui/SectionHeading";
import Loader from "../Loader/Loader";
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const cardVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.97 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("/");
  const d = new Date(`${year}-${month}-${day}`);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const ExperienceItem = ({ exp, index }) => {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div variants={cardVariants} className="relative pl-8 lg:pl-0">
      {/* Timeline dot */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 border-2 border-dark-950 shadow-neon-sm z-10"
        style={{ top: "28px" }}
      />

      <div
        className={`glass-card rounded-2xl overflow-hidden cursor-pointer ${
          index % 2 === 0 ? "lg:mr-[55%] lg:pr-8" : "lg:ml-[55%] lg:pl-8"
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Card header */}
        <div className="flex items-start gap-4 p-5">
          {/* Company logo */}
          <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-1">
            {exp.img ? (
              <img src={exp.img} alt={exp.company} className="w-full h-full object-contain" />
            ) : (
              <div className="w-8 h-8 rounded-lg gradient-text-static flex items-center justify-center font-bold text-lg">
                {exp.company?.[0]}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-base leading-tight">{exp.role}</h3>
                <p className="text-violet-400 font-semibold text-sm mt-0.5">{exp.company}</p>
              </div>
              {exp.present && (
                <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold">
                  Present
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <FaCalendarAlt size={10} />
                {formatDate(exp.startDate)} — {exp.present ? "Present" : formatDate(exp.endDate)}
              </span>
            </div>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1 text-slate-500"
          >
            <FaChevronDown size={14} />
          </motion.div>
        </div>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.desc}</p>

                {/* Skills */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                )}

                {/* Certificate link */}
                {exp.doc && (
                  <a
                    href={exp.doc} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors mt-3 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt size={10} />
                    View Certificate
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const { experiences, loading, fetchExperiences, portfolioId } = usePortfolio();
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (portfolioId && experiences.length === 0) fetchExperiences();
  }, [portfolioId, experiences.length, fetchExperiences]);

  // GSAP: animate the timeline vertical line drawing
  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, duration: 1.5, ease: "power2.inOut",
          scrollTrigger: { trigger: lineRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [experiences]);

  return (
    <section ref={sectionRef} id="experience" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Career"
          title="Work"
          highlight="Experience"
          subtitle="My professional journey building real-world products and services."
        />

        {loading.experiences ? (
          <Loader text="Loading experience..." size="50px" minHeight="260px" />
        ) : (
          <div className="relative">
            {/* Animated vertical timeline line */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, #7c3aed 8%, #a855f7 50%, #06b6d4 92%, transparent)" }}>
              <div ref={lineRef} className="w-full h-full" />
            </div>

            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.15 }}
            >
              {experiences.map((exp, i) => (
                <ExperienceItem key={exp.id ?? i} exp={exp} index={i} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;