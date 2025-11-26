import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCards from "../Cards/ProjectCards";
import { CardContainer, Container, Description, Title, Wrapper } from "./ProjectStyle";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";

const Project = ({ openModal, setOpenModal }) => {
  const { projects, loading, fetchProjects } = usePortfolio();

  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [projects.length,fetchProjects]);

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
      id="apps"
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

        {loading.projects ? (
          <Loader text="Loading projects..." size="60px" minHeight="400px" />
        ) : (
          <CardContainer variants={childVariants}>
            {projects && projects.length > 0 ? (
              [...projects]
                .sort((a, b) => b.id - a.id)
                .map((project, index) => (
                  <motion.div
                    key={project._id}
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
                ))
            ) : (
              <div style={{ 
                color: "white", 
                textAlign: "center", 
                padding: "40px",
                width: "100%" 
              }}>
                No projects found
              </div>
            )}
          </CardContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default Project;