import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";
import { FaGraduationCap } from "react-icons/fa";
import {
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "../ui/ScrollReveal";

const Education = () => {
  const { education, loading, fetchEducation } = usePortfolio();

  useEffect(() => {
    if (education.length === 0) fetchEducation();
  }, [education.length, fetchEducation]);

  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeading
          title="My"
          highlight="Education"
          subtitle="Academic background & qualifications"
        />

        {loading.education ? (
          <Loader text="Loading education..." size="60px" minHeight="400px" />
        ) : education && education.length > 0 ? (
          <StaggerContainer staggerDelay={0.15} className="flex flex-col gap-6">
            {education.map((edu, index) => (
              <StaggerItem
                key={edu.id || index}
                preset={index % 2 === 0 ? "slide-left" : "slide-right"}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="glass rounded-2xl p-5 sm:p-6 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Institution logo */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                      {edu.img ? (
                        <img
                          src={edu.img}
                          alt={edu.school}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML = `<span class="text-violet-400 text-2xl">🎓</span>`;
                          }}
                        />
                      ) : (
                        <FaGraduationCap className="text-violet-400 text-2xl" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-white font-bold text-base sm:text-lg leading-snug">
                          {edu.school}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {edu.grade && (
                            <span className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                              {edu.grade}
                            </span>
                          )}
                          {edu.percentage && (
                            <span className="text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                              {edu.percentage}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-violet-400 font-medium text-sm mb-0.5">{edu.degree}</p>
                      <p className="text-slate-500 text-xs mb-3">{edu.date}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{edu.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <p className="text-slate-400 text-center py-10">No education data found</p>
        )}
      </div>
    </section>
  );
};

export default Education;