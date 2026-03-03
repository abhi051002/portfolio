import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";
import { FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";

const Article = () => {
  const { articles, loading, fetchArticles } = usePortfolio();

  useEffect(() => {
    if (articles.length === 0) fetchArticles();
  }, [articles.length, fetchArticles]);

  return (
    <section id="articles" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

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
            My <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Thoughts, insights & technical write-ups I've published
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        {loading.articles ? (
          <Loader text="Loading articles..." size="60px" minHeight="400px" />
        ) : articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <motion.a
                key={article.id || index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl overflow-hidden group hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 flex flex-col"
              >
                {/* Article image */}
                {article.image && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {article.subTitle}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    {article.publishedAt && (
                      <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <FaCalendarAlt size={11} />
                        {article.publishedAt}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-violet-400 text-xs font-semibold group-hover:gap-2 transition-all">
                      Read on Medium <FaExternalLinkAlt size={10} />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-10">No articles found</p>
        )}
      </div>
    </section>
  );
};

export default Article;
