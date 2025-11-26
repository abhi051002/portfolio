import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Wrapper,
  Title,
  Description,
  SkillsContainer,
  Skill,
  SkillTitle,
  SkillList,
  SkillItem,
  SkillImage,
} from "./SkillsStyle";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";

const Skills = () => {
  const { skills, loading, fetchSkills } = usePortfolio();
  const totalYears = localStorage.getItem("totalYearofExperience");

  useEffect(() => {
    if (skills.length === 0) {
      fetchSkills();
    }
  }, [skills.length,fetchSkills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <Container id="skills">
      <Wrapper>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Skills</Title>
          <Description>
            {`Here are some of my skills on which I have been working on for the
          past ${totalYears} years`}
          </Description>
        </motion.div>

        {loading.skills ? (
          <Loader text="Loading skills..." size="60px" minHeight="400px" />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ width: "100%" }}
          >
            <SkillsContainer>
              {skills && skills.length > 0 ? (
                skills.map((item, index) => {
                  return (
                    <Skill
                      key={index}
                      variants={skillVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "rgba(23, 92, 230, 0.25) 0px 4px 24px",
                      }}
                    >
                      <SkillTitle>{item.title || item.name}</SkillTitle>
                      <SkillList>
                        {item.items &&
                          item.items.map((skill, indexs) => {
                            return (
                              <SkillItem
                                key={indexs}
                                variants={itemVariants}
                                whileHover={{
                                  scale: 1.05,
                                  color: "#854CE6",
                                  borderColor: "#854CE6",
                                  transition: { duration: 0.2 },
                                }}
                              >
                                <SkillImage src={skill.image} />
                                {skill.name}
                              </SkillItem>
                            );
                          })}
                      </SkillList>
                    </Skill>
                  );
                })
              ) : (
                <div
                  style={{
                    color: "white",
                    fontSize: "18px",
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  No skills found
                </div>
              )}
            </SkillsContainer>
          </motion.div>
        )}
      </Wrapper>
    </Container>
  );
};

export default Skills;
