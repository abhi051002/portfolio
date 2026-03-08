import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { ArticleCard } from "../components/Article";
import Loader from "../components/Loader/Loader";
import { FaArrowLeft } from "react-icons/fa";
import {
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "../components/ui/ScrollReveal";

const ArticlesPage = () => {
  const { articles, loading, fetchArticles } = usePortfolio();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (articles.length === 0) fetchArticles();
  }, [articles.length, fetchArticles]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-700/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors group"
          >
            <FaArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <SectionHeading
          title="All"
          highlight="Articles"
          subtitle="All my thoughts, insights & technical write-ups"
        />

        {loading.articles ? (
          <Loader text="Loading articles..." size="60px" minHeight="400px" />
        ) : articles.length > 0 ? (
          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.map((article, index) => (
              <StaggerItem key={article.id || index} preset="fade-up">
                <ArticleCard article={article} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <p className="text-slate-400 text-center py-10">No articles found</p>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
