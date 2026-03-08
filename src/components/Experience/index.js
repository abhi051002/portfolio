import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "../ui/ScrollReveal";

const formatDate = (input) => {
  if (!input) return "Present";
  const parts = input.split("/");
  if (parts.length < 3) return input;
  const [, month, year] = parts;
  return new Date(`${month}/01/${year}`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const getDuration = (start, end) => {
  if (!end) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    end = `${dd}/${mm}/${yyyy}`;
  }
  const [, sm, sy] = start.split("/").map(Number);
  const [, em, ey] = end.split("/").map(Number);
  const totalMonths = (ey - sy) * 12 + (em - sm) + 1;
  if (totalMonths < 12) return `${totalMonths}m`;
  const years = Math.floor(totalMonths / 12);
  const rem = totalMonths % 12;
  return rem === 0 ? `${years}y` : `${years}y ${rem}m`;
};

const Experience = () => {
  const { experiences, loading, fetchExperiences } = usePortfolio();

  useEffect(() => {
    if (experiences.length === 0) fetchExperiences();
  }, [experiences.length, fetchExperiences]);

  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeading
          title="Work"
          highlight="Experience"
          subtitle="My professional journey so far"
        />

        {loading.experiences ? (
          <Loader text="Loading experience..." size="60px" minHeight="400px" />
        ) : experiences && experiences.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/80 via-violet-500/30 to-transparent hidden sm:block" />

            <StaggerContainer staggerDelay={0.15} className="flex flex-col gap-8">
              {experiences.map((exp, index) => (
                <StaggerItem
                  key={index}
                  preset={index % 2 === 0 ? "slide-left" : "slide-right"}
                  className="relative flex gap-6 sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-0 top-6 w-12 justify-center">
                    <div className="w-3 h-3 rounded-full bg-violet-500 border-2 border-violet-300 shadow-lg shadow-violet-500/50 mt-0.5" />
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.01, translateY: -2 }}
                    className="glass rounded-2xl p-5 sm:p-6 w-full hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      {/* Company logo */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                        <img
                          src={exp.img}
                          alt={exp.company}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h3 className="text-white font-bold text-base sm:text-lg">{exp.role}</h3>
                          <span className="text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {getDuration(exp.startDate, exp.present ? null : exp.endDate)}
                          </span>
                        </div>
                        <p className="text-violet-400 font-semibold text-sm mb-0.5">{exp.company}</p>
                        <p className="text-slate-500 text-xs mb-3">
                          {formatDate(exp.startDate)} – {exp.present ? "Present" : formatDate(exp.endDate)}
                          {exp.present && (
                            <span className="ml-2 text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full text-xs">
                              Current
                            </span>
                          )}
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.desc}</p>

                        {/* Skills */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, si) => (
                              <span
                                key={si}
                                className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 rounded-lg hover:border-violet-500/40 hover:text-violet-300 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ) : (
          <p className="text-slate-400 text-center py-10">No experience found</p>
        )}
      </div>
    </section>
  );
};

export default Experience;