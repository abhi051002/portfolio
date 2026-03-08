import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  SectionHeading,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
} from "../ui/ScrollReveal";

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
        <SectionHeading
          title="My"
          highlight="Skills"
          subtitle={
            totalYears
              ? `Technologies I've worked with over the past ${totalYears} years`
              : "Technology stack I work with"
          }
        />

        {loading.skills ? (
          <Loader text="Loading skills..." size="60px" minHeight="400px" />
        ) : skills && skills.length > 0 ? (
          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {skills.map((category, index) => (
              <StaggerItem key={index} preset="scale-up">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 h-full"
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
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <span>{skill.name}</span>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <p className="text-slate-400 text-center py-10">No skills found</p>
        )}
      </div>
    </section>
  );
};

export default Skills;
