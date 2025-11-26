import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  CardContainer,
  Container,
  Description,
  Title,
  Wrapper,
} from "./ArticleStyle";
import ArticleCards from "../Cards/ArticleCards";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";

const Article = () => {
  const { articles, loading,fetchArticles } = usePortfolio();

  useEffect(() => {
    if (articles.length === 0) {
      fetchArticles();
    }
  }, [articles.length, fetchArticles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Container
      id="articles"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <Wrapper>
        <Title variants={childVariants}>Articles</Title>
        <Description variants={childVariants}>
          Here are a few articles I've written based on my work and learning
          experiences.
        </Description>

        {loading.articles ? (
          <Loader text="Loading articles..." size="60px" minHeight="400px" />
        ) : (
          <CardContainer variants={childVariants}>
            {articles && articles.length > 0 ? (
              [...articles]
                .sort((a, b) => b.id - a.id)
                .map((article, index) => (
                  <motion.div
                    key={article._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.1 },
                      },
                    }}
                  >
                    <ArticleCards article={article} />
                  </motion.div>
                ))
            ) : (
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  padding: "40px",
                  width: "100%",
                }}
              >
                No articles found
              </div>
            )}
          </CardContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default Article;
