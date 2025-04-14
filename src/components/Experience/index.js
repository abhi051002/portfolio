import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data/constants';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/Experiencecard'; // We'll create a motion version of the card
import { Container, Wrapper, Title, Description, TimelineSection } from './ExperienceStyle';

const Experience = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.2
            }
        }
    };

    const titleVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Custom animation for timeline items that slide in from alternating sides
    const getTimelineVariants = (index) => {
        const isEven = index % 2 === 0;
        return {
            hidden: {
                x: isEven ? -50 : 50,
                opacity: 0
            },
            visible: {
                x: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: index * 0.1
                }
            }
        };
    };

    const MotionTimelineConnector = motion.create(TimelineConnector);

    return (
        <Container id="experience">
            <Wrapper
                as={motion.div}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div variants={titleVariants}>
                    <Title>Experience</Title>
                    <Description>Here are some of my Experience</Description>
                </motion.div>
                <TimelineSection>
                    <Timeline>
                        {experiences.map((experience, index) => (
                            <motion.div
                                key={index}
                                variants={getTimelineVariants(index)}
                                custom={index}
                            >
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <TimelineDot variant='outlined' color='secondary' />
                                        </motion.div>
                                        {index !== experiences.length - 1 && (
                                            <MotionTimelineConnector
                                                initial={{ height: 0 }}
                                                animate={{ height: '100%' }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                            />
                                        )}
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <motion.div
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: "0px 5px 15px rgba(133, 76, 230, 0.2)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ExperienceCard experience={experience} />
                                        </motion.div>
                                    </TimelineContent>
                                </TimelineItem>
                            </motion.div>
                        ))}
                    </Timeline>
                </TimelineSection>
            </Wrapper>
        </Container>
    );
};

export default Experience;