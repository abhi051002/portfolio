import React from 'react';
import { motion } from 'framer-motion';
import { experiences, projects } from '../../data/constants';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/Experiencecard';
import {
    Container,
    Wrapper,
    Title,
    Description,
    TimelineSection,
    BackgroundOrb,
    TimelineWrapper,
    StatsContainer,
    StatItem,
    StatNumber,
    StatLabel,
    SectionBadge
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

    // Enhanced timeline animation variants
    const getTimelineVariants = (index) => {
        const isEven = index % 2 === 0;
        return {
            hidden: {
                x: isEven ? -60 : 60,
                opacity: 0,
                scale: 0.9
            },
            visible: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: index * 0.15
                }
            }
        };
    };

    const dotVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
            }
        }
    };

    const connectorVariants = {
        hidden: { scaleY: 0 },
        visible: {
            scaleY: 1,
            transition: {
                duration: 0.8,
                ease: "easeInOut",
                delay: 0.3
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

    const MotionTimelineConnector = motion.create(TimelineConnector);
    const MotionTimelineDot = motion.create(TimelineDot);

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
                <TimelineSection>
                    <TimelineWrapper>
                        <Timeline>
                            {experiences.map((experience, index) => (
                                <motion.div
                                    key={index}
                                    variants={getTimelineVariants(index)}
                                    whileInView="visible"
                                    initial="hidden"
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <MotionTimelineDot
                                                variants={dotVariants}
                                                variant='outlined'
                                                color='secondary'
                                                whileHover={{
                                                    scale: 1.3,
                                                    boxShadow: "rgba(139, 92, 246, 0.5) 0px 0px 20px",
                                                    transition: { duration: 0.2 }
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                sx={{
                                                    borderWidth: 2,
                                                    borderColor: '#8b5cf6',
                                                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                                    backdropFilter: 'blur(10px)'
                                                }}
                                            />
                                            {index !== experiences.length - 1 && (
                                                <MotionTimelineConnector
                                                    variants={connectorVariants}
                                                    sx={{
                                                        background: 'linear-gradient(180deg, #8b5cf6, #ec4899)',
                                                        width: 2,
                                                        transformOrigin: 'top'
                                                    }}
                                                />
                                            )}
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <motion.div
                                                whileHover={{
                                                    scale: 1.02,
                                                    y: -5,
                                                    transition: { duration: 0.3 }
                                                }}
                                                whileInView={{
                                                    rotateY: [5, 0],
                                                    transition: { duration: 0.6, delay: index * 0.1 }
                                                }}
                                                viewport={{ once: true }}
                                            >
                                                <ExperienceCard experience={experience} />
                                            </motion.div>
                                        </TimelineContent>
                                    </TimelineItem>
                                </motion.div>
                            ))}
                        </Timeline>
                    </TimelineWrapper>
                </TimelineSection>
            </Wrapper>
        </Container>
    );
};

export default Experience;