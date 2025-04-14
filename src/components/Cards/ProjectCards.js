import React from 'react';
import { Avatar, Card, Date, Description, Details, Image, Members, Tag, Tags, Title, WorkingBookmark } from './Styles/ProjectCardStyle';

const ProjectCards = ({ project, setOpenModal }) => {
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

  // Tag animation
  const tagVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  // Bookmark animation
  const bookmarkVariants = {
    initial: { x: 100 },
    animate: { x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <Card
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      onClick={() => setOpenModal({ state: true, project: project })}
    >
      {!project.isDone && (
        <WorkingBookmark
          initial="initial"
          animate="animate"
          variants={bookmarkVariants}
        >
          Working on it
        </WorkingBookmark>
      )}
      <Image
        src={project.image}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      />
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag
            key={index}
            variants={tagVariants}
            whileHover={{ scale: 1.1 }}
          >
            {tag}
          </Tag>
        ))}
      </Tags>
      <Details>
        <Title>
          {project.title}
        </Title>
        <Date>
          {project.date}
        </Date>
        <Description>
          {project.description}
        </Description>
      </Details>
      <Members>
        {project.member?.map((member, index) => (
          <Avatar
            key={index}
            src={member.img}
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
          />
        ))}
      </Members>
    </Card>
  );
};

export default ProjectCards;