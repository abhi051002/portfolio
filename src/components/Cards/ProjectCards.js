import React from "react";
import styled from "styled-components";

const Button = styled.a`
  opacity: 0;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text_black};
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.5s ease-in-out; /* Smooth transition */
  text-align: center;
  text-decoration: none;
`;

const Card = styled.div`
  width: 330px;
  height: 520px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  padding: 26px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
  &:hover ${Button} {
    opacity: 1; /* Show button on hover */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 2px 8px;
  border-radius: 10px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

// const Members = styled.div`
//   display: flex;
//   align-items: center;
//   padding-left: 10px;
// `;
// const Avatar = styled.img`
//   width: 38px;
//   height: 38px;
//   border-radius: 50%;
//   margin-left: -10px;
//   background-color: ${({ theme }) => theme.white};
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//   border: 3px solid ${({ theme }) => theme.card};
// `;

const ComingSoonBookmark = styled.div`
  position: absolute;
  top: 0px;
  right: -5px;
  z-index: 10;
`;

const BookmarkInner = styled.div`
  position: relative;
`;

const BookmarkContent = styled.div`
  background-color: ${({ theme }) => theme.primary || "#eab308"};
  position: relative;
  color: white;
  padding: 10px 30px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  // border-radius: 12px;

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
    // border-left: 5px solid ${({ theme }) =>
      theme.primary || "#754d0e"}; // darker shade for fold
    border-bottom: 10px solid transparent;
  }
`;

const BookmarkTriangle = styled.div`
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 8px solid ${({ theme }) => theme.primary || "#eab308"};
  }
`;

const BookmarkShadowRight = styled.div`
  position: absolute;
  top: 0;
  right: -4px;
  width: 4px;
  height: 100%;
`;

const BookmarkShadowLeft = styled.div`
  position: absolute;
  top: 0;
  left: -4px;
  width: 4px;
  height: 100%;
`;

const ProjectCards = ({ project, setOpenModal }) => {
  return (
    <Card>
      {!project.isDone && (
        <ComingSoonBookmark>
          <BookmarkInner>
            <BookmarkContent>Coming Soon</BookmarkContent>
            <BookmarkTriangle />
            <BookmarkShadowRight />
            <BookmarkShadowLeft />
          </BookmarkInner>
        </ComingSoonBookmark>
      )}
      <Image src={project.image} />
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
      {project.webapp !== "" ? (
        <Button
          href={project.webapp !== "" ? project.webapp : project.github}
          target="_blank"
        >
          View Project
        </Button>
      ) : null}
      {project.github === "" ? (
        ""
      ) : (
        <Button href={project.github} target="_blank">
          View Git Repository
        </Button>
      )}
    </Card>
  );
};

export default ProjectCards;
