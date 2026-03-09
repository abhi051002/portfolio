import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { Link } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import Loader from "../components/Loader/Loader";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const ArticleCard = ({ article }) => (
  <motion.a
    href={article.link}
    target="_blank"
    rel="noopener noreferrer"
    variants={cardVariants}
    whileHover={{ y: -5 }}
    className="group glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
  >
    {article.image && (
      <div className="h-44 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
    )}
    <div className="flex flex-col flex-1 p-5">
      {article.publishedAt && (
        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-2">
          <FaCalendarAlt size={9} /> {article.publishedAt}
        </div>
      )}
      <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">{article.title}</h3>
      <p className="text-slate-400 text-xs leading-relaxed flex-1 line-clamp-3">{article.subTitle}</p>
      <div className="flex items-center gap-1.5 mt-4 text-violet-400 text-xs font-semibold group-hover:text-violet-300 transition-colors">
        Read on Medium <FaArrowRight size={9} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.a>
);

const ArticlesPage = () => {
  const { articles, loading, fetchArticles, portfolioId } = usePortfolio();

  useEffect(() => {
    if (portfolioId && articles.length === 0) fetchArticles();
  }, [portfolioId, articles.length, fetchArticles]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-400 text-sm font-medium transition-colors mb-10 group">
          <FaArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <SectionHeading label="Writing" title="All" highlight="Articles" subtitle="My thoughts on web development, engineering, and technology." />

        {loading.articles ? (
          <Loader text="Loading articles..." size="50px" minHeight="300px" />
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }}
          >
            {articles.map((article, i) => (
              <ArticleCard key={article.id ?? i} article={article} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
