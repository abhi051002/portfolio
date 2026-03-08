import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";
import { FaExternalLinkAlt, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import {
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "../ui/ScrollReveal";

export const ArticleCard = ({ article, index = 0 }) => (
  <motion.a
    href={article.link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -4 }}
    className="glass rounded-2xl overflow-hidden group hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 flex flex-col h-full"
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
);

const Article = () => {
  const { articles, loading, fetchArticles } = usePortfolio();

  useEffect(() => {
    if (articles.length === 0) fetchArticles();
  }, [articles.length, fetchArticles]);

  const displayed = articles.slice(0, 3);
  const hasMore = articles.length > 3;

  return (
    <section id="articles" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeading
          title="My"
          highlight="Articles"
          subtitle="Thoughts, insights & technical write-ups I've published"
        />

        {loading.articles ? (
          <Loader text="Loading articles..." size="60px" minHeight="400px" />
        ) : articles && articles.length > 0 ? (
          <>
            <StaggerContainer
              staggerDelay={0.15}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayed.map((article, index) => (
                <StaggerItem key={article.id || index} preset="fade-up">
                  <ArticleCard article={article} index={index} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Show More Button */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center mt-10"
              >
                <Link
                  to="/articles"
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-0.5"
                >
                  {/* Gradient border */}
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 p-[1px]">
                    <span className="flex h-full w-full rounded-2xl bg-[#030712] items-center justify-center" />
                  </span>
                  {/* Inner content */}
                  <span className="relative z-10 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 group-hover:from-white group-hover:to-white transition-all duration-300">
                    View All Articles
                    <FaArrowRight size={12} className="text-violet-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </span>
                </Link>
              </motion.div>
            )}
          </>
        ) : (
          <p className="text-slate-400 text-center py-10">No articles found</p>
        )}
      </div>
    </section>
  );
};

export default Article;
