import React from "react";
import styled from "styled-components";

// Improved Button with hover effect and better contrast 
const Button = styled.a`
  opacity: 0;
  width: 100%;
  padding: 12px;
  margin-top: auto;
  background-color: ${({ theme }) => theme.white};
  color: #3657c2;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background-color: rgba(0, 0, 0);
    color: rgba(255, 255, 255);
  }
`;

// Enhanced Card component with better spacing and transitions
const Card = styled.div`
  width: 330px;
  height: 520px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background-color: ${({ theme }) => theme.card};
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 24px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    filter: brightness(1.05);
  }
  
  &:hover ${Button} {
    opacity: 1;
  }
`;

// Improved image with better shadow and scale effect on hover
const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.02);
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`;

// Enhanced Tag with hover effect
const Tag = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 4px 10px;
  border-radius: 20px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 2px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  margin-top: 2px;
  
  @media only screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  margin: 8px 0 0;
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  
  @media screen and (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

// Improved Coming Soon bookmark with better 3D effect
const ComingSoonBookmark = styled.div`
  position: absolute;
  top: 0;
  right: -5px;
  z-index: 10;
`;

const BookmarkInner = styled.div`
  position: relative;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
`;

const BookmarkContent = styled.div`
  background-color: ${({ theme }) => theme.primary || "#eab308"};
  position: relative;
  color: white;
  padding: 10px 30px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  
  &:before {
    content: "";
    position: absolute;
    right: -20px;
    top: 0;
    border-right: 20px solid transparent;
    border-bottom: 20px solid ${({ theme }) => theme.primary || "#eab308"};
    border-top: 20px solid ${({ theme }) => theme.primary || "#eab308"};
  }
  
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.primary || "#eab308"};
  }
`;

const ProjectCards = ({ project }) => {
  return (
    <Card>
      {!project.isDone && (
        <ComingSoonBookmark>
          <BookmarkInner>
            <BookmarkContent>Coming Soon</BookmarkContent>
          </BookmarkInner>
        </ComingSoonBookmark>
      )}

      <Image src={project.image} alt={project.title} />

      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>

      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
      </Details>

      <ButtonContainer>
        {project.webapp && (
          <Button
            href={project.webapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} project`}
          >
            Live App
          </Button>
        )}

        {project.github && (
          <Button
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            secondary
            aria-label={`View ${project.title} GitHub repository`}
          >
            View Code
          </Button>
        )}
      </ButtonContainer>
    </Card>
  );
};

export default ProjectCards;