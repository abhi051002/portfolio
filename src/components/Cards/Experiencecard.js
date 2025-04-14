import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Span = styled.span`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Document = styled.img`
  display: none;
  height: 70px;
  width: fit-content;
  background-color: #000;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

// Convert Card to a motion component
const Card = styled(motion.div)`
  width: 650px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  padding: 12px 16px;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease-in-out;
  
  @media only screen and (max-width: 768px) {
    padding: 10px;
    gap: 8px;
    width: 300px;
  }

  &:hover ${Document} {
    display: flex;
  }

  &:hover ${Span} {
    overflow: visible;
    -webkit-line-clamp: unset;
  }

  border: 0.1px solid #306EE8;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
`;

const Top = styled(motion.div)`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const Logo = styled(motion.img)`
  height: 50px;
  background-color: #000;
  border-radius: 10px;
  margin-top: 4px;
  width: 50px;
  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const Body = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column; 
`;

const Role = styled(motion.div)`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Company = styled(motion.div)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Duration = styled(motion.div)`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const ExperieneYear = styled(motion.div)`
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled(motion.div)`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Skills = styled(motion.div)`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-top: -10px;
  color: white;
`;

const ItemWrapper = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Skill = styled(motion.div)`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Experiencecard = ({ experience }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    const skillVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1
        },
        hover: {
            scale: 1.05,
            color: "#854CE6",
            transition: { duration: 0.2 }
        }
    };

    const logoVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.4 }
        },
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
        }
    };

    return (
        <Card
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
        >
            <Top>
                <Logo
                    src={experience.img}
                    variants={logoVariants}
                    whileHover="hover"
                />
                <Body>
                    <Role variants={itemVariants}>{experience.role}</Role>
                    <Company variants={itemVariants}>{experience.company}</Company>
                    <Duration variants={itemVariants}>{experience.date}</Duration>
                    <ExperieneYear variants={itemVariants}>{experience.experiencesInYear}</ExperieneYear>
                </Body>
            </Top>
            <Description variants={itemVariants}>{experience.desc}</Description>
            {experience?.skills &&
                <>
                    <br />
                    <Skills variants={itemVariants}>
                        <motion.b variants={itemVariants}>Skills:</motion.b>
                        <ItemWrapper>
                            {experience.skills.map((skill, index) => (
                                index === 0 ?
                                    <Skill key={index} variants={skillVariants}>{skill}</Skill> :
                                    <Skill key={index} variants={skillVariants}> , {skill}</Skill>
                            ))}
                        </ItemWrapper>
                    </Skills>
                </>}
            {/* {experience.doc &&
      <a href={experience.doc} target='new'>
        <Document src={experience.doc} />
      </a>} */}
        </Card>
    );
}

export default Experiencecard;