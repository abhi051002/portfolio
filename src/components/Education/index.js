import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionHeading from "../ui/SectionHeading";
import Loader from "../Loader/Loader";
import { FaGraduationCap, FaMedal } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const EducationCard = ({ edu }) => (
  <motion.div
    variants={cardVariants}
    className="glass-card rounded-2xl p-6 flex gap-5"
  >
    {/* Logo / Icon */}
    <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
      {edu.img ? (
        <img src={edu.img} alt={edu.school} className="w-full h-full object-contain" />
      ) : (
        <FaGraduationCap size={28} className="text-violet-400" />
      )}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <h3 className="font-bold text-white text-base leading-snug">{edu.school}</h3>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25">
          <FaMedal size={10} className="text-violet-400" />
          <span className="text-violet-300 text-xs font-semibold">{edu.grade}</span>
        </div>
      </div>
      <p className="text-violet-400 text-sm font-medium mt-0.5">{edu.degree}</p>
      <p className="text-slate-500 text-xs mt-1">{edu.date}</p>
      {edu.desc && (
        <p className="text-slate-400 text-sm leading-relaxed mt-3 line-clamp-4">{edu.desc}</p>
      )}
    </div>
  </motion.div>
);

const Education = () => {
  const { education, loading, fetchEducation, portfolioId } = usePortfolio();

  useEffect(() => {
    if (portfolioId && education.length === 0) fetchEducation();
  }, [portfolioId, education.length, fetchEducation]);

  return (
    <section id="education" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Background"
          title="Academic"
          highlight="Education"
          subtitle="Where I built my foundation in computer science and engineering."
        />

        {loading.education ? (
          <Loader text="Loading education..." size="50px" minHeight="260px" />
        ) : (
          <motion.div
            className="flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {education.map((edu, i) => (
              <EducationCard key={edu.id ?? i} edu={edu} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Education;