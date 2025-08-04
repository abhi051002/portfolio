import React from "react";
import { motion } from "framer-motion";
import { skills, totalYears } from "../../data/constants";
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

const Skills = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
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
      }
    }
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
      }
    }
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ width: "100%" }}
        >
          <SkillsContainer>
            {skills.map((item, index) => (
              <Skill
                key={index}
                variants={skillVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "rgba(23, 92, 230, 0.25) 0px 4px 24px"
                }}
              >
                <SkillTitle>{item.title}</SkillTitle>
                <SkillList>
                  {item.skills.map((skill, indexs) => (
                    <SkillItem
                      key={indexs}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        color: "#854CE6",
                        borderColor: "#854CE6",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <SkillImage src={skill.image} />
                      {skill.name}
                    </SkillItem>
                  ))}
                </SkillList>
              </Skill>
            ))}
          </SkillsContainer>
        </motion.div>
      </Wrapper>
    </Container>
  );
};

export default Skills;