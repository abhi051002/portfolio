import React from "react";
import { motion } from "framer-motion";
import { skills } from "../../data/constants";
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
  BackgroundOrb,
  SkillIcon,
  SkillBadge,
  GradientOverlay,
  SkillHeader
} from "./SkillsStyle";

const Skills = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const skillVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      y: 10
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Enhanced hover animations
  const skillHoverVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "rgba(139, 92, 246, 0.4) 0px 20px 40px, rgba(139, 92, 246, 0.2) 0px 10px 20px",
      borderColor: "#8b5cf6",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const itemHoverVariants = {
    hover: {
      scale: 1.08,
      y: -2,
      backgroundColor: "rgba(139, 92, 246, 0.1)",
      borderColor: "#8b5cf6",
      color: "#8b5cf6",
      boxShadow: "rgba(139, 92, 246, 0.3) 0px 8px 16px",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container id="skills">
      <BackgroundOrb
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <BackgroundOrb
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ right: '10%', top: '20%' }}
      />
      
      <Wrapper>
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Title>
            <span className="gradient-text">Skills & Technologies</span>
          </Title>
          <Description>
            Here are the technologies and tools I've mastered over the past 2+ years of development journey
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
                whileHover={skillHoverVariants.hover}
              >
                <GradientOverlay />
                
                <SkillHeader>
                  <SkillIcon>
                    {/* You can add category-specific icons here */}
                    <div className="icon-placeholder">"{}"</div>
                  </SkillIcon>
                  <SkillTitle>{item.title}</SkillTitle>
                  <SkillBadge>
                    {item.skills.length} skills
                  </SkillBadge>
                </SkillHeader>

                <SkillList
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {item.skills.map((skill, indexs) => (
                    <SkillItem
                      key={indexs}
                      variants={itemVariants}
                      whileHover={itemHoverVariants.hover}
                    >
                      <SkillImage 
                        src={skill.image} 
                        alt={skill.name}
                        loading="lazy"
                      />
                      <span className="skill-name">{skill.name}</span>
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