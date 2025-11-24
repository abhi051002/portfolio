import React from 'react';
import { ReadButton, Card, Date, Description, Details, Image ,Title } from './Styles/ArticleCardStyle';
import { MessageSquareShare } from 'lucide-react';

const ArticleCards = ({ article }) => {
  // Card hover animation
  const cardVariants = {
    initial: { scale: 1, y: 0, boxShadow: "0 0 12px 4px rgba(0,0,0,0.4)" },
    hover: {
      scale: 1.02,
      y: -10,
      boxShadow: "0 0 50px 4px rgba(0,0,0,0.6)",
      filter: "brightness(1.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <Card
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
    >
      <Image
        src={article.image}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      />
      <Details>
        <Title>
          {article.title}
        </Title>
        <Date>
          Published on : {article.publishedAt}
        </Date>
        <Description>
          {article.subTitle}
        </Description>
      </Details>
        <ReadButton>Read Article <MessageSquareShare/></ReadButton>
    </Card>
  );
};

export default ArticleCards;