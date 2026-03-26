import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";

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

// ── Single role row used both for standalone cards and child sub-roles ──
const RoleCard = ({ exp, isChild = false }) => (
  <div className={`flex items-start gap-4 ${isChild ? "" : ""}`}>
    {/* Company logo (only shown on parent) */}
    {!isChild && (
      <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10">
        <img
          src={exp.img}
          alt={exp.company}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
    )}

    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
        <h3
          className={`font-bold ${isChild
              ? "text-slate-700 dark:text-slate-200 text-sm sm:text-base"
              : "text-slate-900 dark:text-white text-base sm:text-lg"
            }`}
        >
          {exp.role}
        </h3>
        <span className="text-xs text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
          {getDuration(exp.startDate, exp.present ? null : exp.endDate)}
        </span>
      </div>

      {!isChild && (
        <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm mb-0.5">
          {exp.company}
        </p>
      )}

      <p className="text-slate-600 dark:text-slate-500 text-xs mb-3">
        {formatDate(exp.startDate)} –{" "}
        {exp.present ? "Present" : formatDate(exp.endDate)}
        {exp.present && (
          <span className="ml-2 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 px-2 py-0.5 rounded-full text-xs">
            Current
          </span>
        )}
      </p>

      {exp.desc && (
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          {exp.desc}
        </p>
      )}

      {exp.skills && exp.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill, si) => (
            <span
              key={si}
              className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 rounded-lg hover:border-violet-400 dark:hover:border-violet-500/40 hover:text-violet-600 dark:hover:text-violet-300 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Experience = () => {
  const { experiences, loading, fetchExperiences } = usePortfolio();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (experiences.length === 0) fetchExperiences();
  }, [experiences.length, fetchExperiences]);

  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">My professional journey so far</p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        {loading.experiences ? (
          <Loader text="Loading experience..." size="60px" minHeight="400px" />
        ) : experiences && experiences.length > 0 ? (
          <div className="relative">
            {/* Main timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/80 via-violet-500/30 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-8">
              {experiences.slice(0, isHome ? 3 : experiences.length).map((exp, index) => (
                <motion.div
                  key={exp._id || index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-6 sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-0 top-6 w-12 justify-center">
                    <div className="w-3 h-3 rounded-full bg-violet-500 border-2 border-violet-300 shadow-lg shadow-violet-500/50 mt-0.5" />
                  </div>

                  {/* Outer card */}
                  <motion.div
                    whileHover={{ scale: 1.005, translateY: -2 }}
                    className="glass rounded-2xl p-5 sm:p-6 w-full hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
                  >
                    {/* Parent role */}
                    <RoleCard exp={exp} isChild={false} />

                    {/* ── Children (sub-roles / promotions) ── */}
                    {exp.children && exp.children.length > 0 && (
                      <div className="mt-5 ml-4 sm:ml-16 border-l-2 border-violet-300 dark:border-violet-500/30 pl-4 flex flex-col gap-4">
                        {exp.children.map((child, ci) => (
                          <motion.div
                            key={child._id || ci}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: ci * 0.08 }}
                            className="relative"
                          >
                            {/* Horizontal connector */}
                            <div className="absolute -left-4 top-4 w-3 h-px bg-violet-400 dark:bg-violet-500/40" />
                            {/* Small dot on the vertical line */}
                            <div className="absolute -left-[18px] top-[13px] w-2 h-2 rounded-full bg-violet-300 dark:bg-violet-400/60 border border-violet-400 dark:border-violet-300/40" />

                            <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-xl p-4">
                              <RoleCard exp={child} isChild={true} />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {isHome && experiences.length > 3 && (
              <div className="mt-12 flex justify-center relative z-20">
                <Link
                  to="/experience"
                  onClick={() => window.scrollTo(0, 0)}
                  className="px-8 py-3 bg-slate-100 dark:bg-white/5 border border-violet-500/30 hover:bg-violet-100 dark:hover:bg-violet-500/10 hover:border-violet-500 text-violet-600 dark:text-violet-400 hover:text-slate-900 dark:hover:text-white font-semibold rounded-xl transition-all duration-300 shadow-lg"
                >
                  Show All Experience
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-10">No experience found</p>
        )}
      </div>
    </section>
  );
};

export default Experience;