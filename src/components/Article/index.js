import React from "react";
import { motion } from "framer-motion";
import { articles } from "../../data/constants";
import {
  CardContainer,
  Container,
  Description,
  Title,
  Wrapper,
} from "./ArticleStyle";
import ArticleCards from "../Cards/ArticleCards";

const Article = () => {
  // Animation variants
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
          Here are a few articles I’ve written based on my work and learning
          experiences.
        </Description>
        <CardContainer variants={childVariants}>
          {[...articles]
            .sort((a, b) => b.id - a.id)
            .map((article, index) => (
              <motion.div
                key={article.id}
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
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Article;
