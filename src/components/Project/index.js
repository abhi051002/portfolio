import React from "react";
import { motion } from "framer-motion";
import ProjectCards from "../Cards/ProjectCards";
import { projects } from "../../data/constants";
import { CardContainer, Container, Description, Title, Wrapper } from "./ProjectStyle";

const Project = ({ openModal, setOpenModal }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Container
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <Wrapper>
        <Title variants={childVariants}>
          Projects
        </Title>
        <Description variants={childVariants}>
          I have worked on some of projects. Here are some of projects Some of
          Projects.
        </Description>
        <CardContainer variants={childVariants}>
          {[...projects]
            .sort((a, b) => b.id - a.id)
            .map((project, index) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 }
                  }
                }}
              >
                <ProjectCards
                  project={project}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              </motion.div>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Project;