import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";

const Skills = () => {
  const { skills, loading, fetchSkills } = usePortfolio();
  const totalYears = localStorage.getItem("totalYearofExperience");

  useEffect(() => {
    if (skills.length === 0) fetchSkills();
  }, [skills.length, fetchSkills]);

  return (
    <section id="skills" className="py-20 px-4 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            {totalYears
              ? `Technologies I've worked with over the past ${totalYears} years`
              : "Technology stack I work with"}
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        {loading.skills ? (
          <Loader text="Loading skills..." size="60px" minHeight="400px" />
        ) : skills && skills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {skills.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-500 rounded-full" />
                  {category.title || category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.items &&
                    category.items.map((skill, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-violet-600/20 border border-white/8 hover:border-violet-500/40 rounded-xl text-sm text-slate-300 hover:text-white transition-all duration-200 cursor-default"
                      >
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="w-5 h-5 object-contain"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <span>{skill.name}</span>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-10">No skills found</p>
        )}
      </div>
    </section>
  );
};

export default Skills;
