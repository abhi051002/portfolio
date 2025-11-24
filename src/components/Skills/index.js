import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Skills = () => {
  const [categories, setCategories] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const portfolioId = localStorage.getItem("portfolioId");
  const totalYears = localStorage.getItem("totalYearofExperience");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const categoriesRes = await axios.get(
          `${backendUrl}/skills/categories/${portfolioId}`
        );

        // Fetch items for each category
        const categoriesWithItems = await Promise.all(
          categoriesRes.data.map(async (cat) => {
            const itemsRes = await axios.get(
              `${backendUrl}/skills/items/${cat._id}`
            );
            return { ...cat, items: itemsRes.data };
          })
        );

        setCategories(categoriesWithItems);
      } catch (error) {
        console.error("❌ Error fetching skills:", error);
      }
    };

    if (backendUrl && portfolioId) {
      fetchSkills();
    }
  }, [backendUrl, portfolioId]);

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%" }}
        >
          <SkillsContainer>
            {categories && categories.length > 0 ? (
              categories.map((item, index) => {
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
              <div style={{ color: "white", fontSize: "24px" }}>
                No categories to display
              </div>
            )}
          </SkillsContainer>
        </motion.div>
      </Wrapper>
    </Container>
  );
};

export default Skills;
