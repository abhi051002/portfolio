import React from "react";
import styled from "styled-components";
import ProjectCards from "../Cards/ProjectCards";
import { projects } from "../../data/constants";

const Container = styled.div`
background: linear-gradient(
    342.07deg,
    rgba(132,59,206,0.06) 5.71%,
    rgba(132,59,206,0) 64.83%,
)
flex-direction: column;
display: flex;
justify-content: center;
align-items: center;
position: relative;
z-index: 1;
padding:50px 20px;
clip-path: polygon(0 0,100% 0,100% 100%, 100% 98%,0 100%);
`;

const Wrapper = styled.div`
  max-width: 1550px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 10px 0 100px 0;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

export const Description = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // grid-gap: 32px;
  // grid-auto-rows: minmax(100px, auto);
  // @media (max-width: 960px) {
  //     grid-template-columns: repeat(2, 1fr);
  // }
  // @media (max-width: 640px) {
  //     grid-template-columns: repeat(1, 1fr);
  // }
`;
const Project = () => {
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Description>
          I have worked on some of projects. Here are some of projects Some of
          Projects.
        </Description>
        <CardContainer>
          {projects.map((project, index) => (
            <ProjectCards project={project} key={index} />
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Project;
