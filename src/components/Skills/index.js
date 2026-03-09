import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionHeading from "../ui/SectionHeading";
import Loader from "../Loader/Loader";

gsap.registerPlugin(ScrollTrigger);

const TABS = ["All", "Programming Languages", "Frameworks & Libraries", "Databases", "Tools & Technologies"];

const skillGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const skillItemVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] },
  },
  exit: { opacity: 0, scale: 0.7, y: -10, transition: { duration: 0.2 } },
};

const SkillCard = ({ skill }) => (
  <motion.div
    variants={skillItemVariants}
    whileHover={{ y: -4, scale: 1.05 }}
    className="flex flex-col items-center gap-3 p-4 rounded-2xl glass-card cursor-default group"
  >
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden p-1.5 group-hover:bg-white/10 transition-colors duration-300">
      <img
        src={skill.image}
        alt={skill.name}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
    <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors text-center leading-tight">
      {skill.name}
    </span>
  </motion.div>
);

const Skills = () => {
  const { skills, loading, fetchSkills, portfolioId } = usePortfolio();
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef(null);

  useEffect(() => {
    if (portfolioId && skills.length === 0) fetchSkills();
  }, [portfolioId, skills.length, fetchSkills]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".skills-heading", start: "top 85%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filteredSkills =
    activeTab === "All"
      ? skills.flatMap((cat) => cat.items || [])
      : (skills.find((cat) => cat.title === activeTab)?.items || []);

  const tabs = ["All", ...skills.map((cat) => cat.title).filter(Boolean)];

  return (
    <section ref={sectionRef} id="skills" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-violet-500/40" />

      <div className="max-w-7xl mx-auto">
        <div className="skills-heading opacity-0">
          <SectionHeading
            label="Expertise"
            title="Technical"
            highlight="Skills"
            subtitle="Technologies I work with daily to build robust, scalable web applications."
          />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                activeTab === tab
                  ? "bg-violet-600 border-violet-500 text-white shadow-neon-sm"
                  : "glass border-white/8 text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading.skills ? (
          <Loader text="Loading skills..." size="50px" minHeight="260px" />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={skillGridVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3"
            >
              {filteredSkills.map((skill, i) => (
                <SkillCard key={`${skill.name}-${i}`} skill={skill} />
              ))}
              {filteredSkills.length === 0 && !loading.skills && (
                <p className="col-span-full text-center text-slate-500 py-12">No skills found in this category.</p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default Skills;
