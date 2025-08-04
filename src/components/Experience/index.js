import React from 'react';
import { motion } from 'framer-motion';
import { experiences, projects } from '../../data/constants';
import ExperienceCard from '../Cards/Experiencecard';
import {
    Container,
    Wrapper,
    Title,
    Description,
    BackgroundOrb,
    TimelineWrapper,
    StatsContainer,
    StatItem,
    StatNumber,
    StatLabel,
    SectionBadge,
    TimelineContainer,
    TimelineItem,
    TimelineDot
} from './ExperienceStyle';

const Experience = () => {
    // Enhanced animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const titleVariants = {
        hidden: { y: -30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const badgeVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
            }
        }
    };

    const statsVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.4
            }
        }
    };

    const statItemVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    // Calculate stats from experiences
    const totalExperience = experiences.length;
    const getMonthDifference = (start, end) => {
        if (!end) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            end = `${dd}/${mm}/${yyyy}`;
        }

        const [, startMonth, startYear] = start.split("/").map(Number);
        const [, endMonth, endYear] = end.split("/").map(Number);

        const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
        return totalMonths;
    };

    // Calculate total experience in years
    const totalMonths = experiences.reduce((acc, exp) => {
        return acc + getMonthDifference(exp.startDate, exp.present ? null : exp.endDate);
    }, 0);

    const totalYears = (totalMonths / 12).toFixed(1);

    const totalProjects = projects.reduce((acc, project) => {
        return acc + (project.isDone ? 1 : 0);
    }, 0);

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            }
        }
    };

    return (
        <Container id="experience">
            {/* Background Elements */}
            <BackgroundOrb
                animate={{
                    x: [0, 80, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <BackgroundOrb
                animate={{
                    x: [0, -60, 0],
                    y: [0, 50, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ right: '5%', bottom: '10%' }}
            />

            <Wrapper
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Section Badge */}
                <motion.div variants={badgeVariants}>
                    <SectionBadge>
                        Professional Journey
                    </SectionBadge>
                </motion.div>

                {/* Title and Description */}
                <motion.div variants={titleVariants}>
                    <Title>
                        <span className="gradient-text">Experience & Journey</span>
                    </Title>
                    <Description>
                        My professional experiences and the exciting projects I've worked on throughout my career
                    </Description>
                </motion.div>

                {/* Stats Section */}
                <motion.div variants={statsVariants}>
                    <StatsContainer>
                        <motion.div variants={statItemVariants}>
                            <StatItem
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "rgba(139, 92, 246, 0.3) 0px 8px 24px"
                                }}
                            >
                                <StatNumber>{totalExperience}+</StatNumber>
                                <StatLabel>Experiences</StatLabel>
                            </StatItem>
                        </motion.div>

                        <motion.div variants={statItemVariants}>
                            <StatItem
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "rgba(236, 72, 153, 0.3) 0px 8px 24px"
                                }}
                            >
                                <StatNumber>{totalYears}+</StatNumber>
                                <StatLabel>Years Journey</StatLabel>
                            </StatItem>
                        </motion.div>

                        <motion.div variants={statItemVariants}>
                            <StatItem
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "rgba(6, 182, 212, 0.3) 0px 8px 24px"
                                }}
                            >
                                <StatNumber>{totalProjects}</StatNumber>
                                <StatLabel>Projects</StatLabel>
                            </StatItem>
                        </motion.div>
                    </StatsContainer>
                </motion.div>

                {/* Timeline Section */}
                <TimelineContainer
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <TimelineWrapper>
                        {experiences.map((experience, index) => (
                            <TimelineItem
                                key={experience.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <TimelineDot
                                    whileHover={{
                                        scale: 1.3,
                                        boxShadow: "rgba(139, 92, 246, 0.6) 0px 0px 25px"
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                />
                                <ExperienceCard experience={experience} index={index} />
                            </TimelineItem>
                        ))}
                    </TimelineWrapper>
                </TimelineContainer>
            </Wrapper>
        </Container>
    );
};

export default Experience;