import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionHeading from "../ui/SectionHeading";
import Loader from "../Loader/Loader";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const ArticleCard = ({ article }) => (
  <motion.a
    href={article.link}
    target="_blank"
    rel="noopener noreferrer"
    variants={cardVariants}
    whileHover={{ y: -6 }}
    className="group glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
  >
    {/* Thumbnail */}
    <div className="relative h-44 overflow-hidden">
      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-violet-900/30 to-cyan-900/20" />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,32,0.8) 0%, transparent 50%)" }} />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-5">
      {article.publishedAt && (
        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
          <FaCalendarAlt size={10} />
          {article.publishedAt}
        </div>
      )}
      <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-slate-400 text-xs leading-relaxed flex-1 line-clamp-3">{article.subTitle}</p>
      <div className="flex items-center gap-1.5 mt-4 text-violet-400 text-xs font-semibold group-hover:text-violet-300 transition-colors">
        Read on Medium
        <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.a>
);

const Article = () => {
  const { articles, loading, fetchArticles, portfolioId } = usePortfolio();

  useEffect(() => {
    if (portfolioId && articles.length === 0) fetchArticles();
  }, [portfolioId, articles.length, fetchArticles]);

  const displayed = articles.slice(0, 3);

  return (
    <section id="articles" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Writing"
          title="Latest"
          highlight="Articles"
          subtitle="Thoughts on web development, software engineering, and technology."
        />

        {loading.articles ? (
          <Loader text="Loading articles..." size="50px" minHeight="260px" />
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.12 }}
          >
            {displayed.map((article, i) => (
              <ArticleCard key={article.id ?? i} article={article} />
            ))}
          </motion.div>
        )}

        {articles.length > 3 && (
          <div className="text-center mt-10">
            <a href="/articles" className="btn-outline">View All Articles →</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Article;
