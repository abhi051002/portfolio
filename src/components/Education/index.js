import React from 'react';
import { motion } from 'framer-motion';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { education } from '../../data/constants';
import EducationCard from '../Cards/EducationCard';
import { Container, Wrapper, Title, Description, TimelineSection, StyledTimeline, MotionTimelineItem } from './EducationStyle';



const Education = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.3
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

    const timelineItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                delay: i * 0.2
            }
        })
    };

    return (
        <Container
            id="education"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <Wrapper>
                <Title variants={childVariants}>
                    Education
                </Title>
                <Description variants={childVariants}>
                    My education has been a journey of self-discovery and growth. My educational details are as follows.
                </Description>
                <TimelineSection variants={childVariants}>
                    <StyledTimeline>
                        {education.map((edu, index) => (
                            <MotionTimelineItem
                                key={index}
                                custom={index}
                                variants={timelineItemVariants}
                            >
                                <TimelineSeparator>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.2, duration: 0.3 }}
                                    >
                                        <TimelineDot variant='outlined' color='secondary' />
                                    </motion.div>
                                    {index !== education.length - 1 && (
                                        <TimelineConnector />
                                    )}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <EducationCard education={edu} index={index} />
                                </TimelineContent>
                            </MotionTimelineItem>
                        ))}
                    </StyledTimeline>
                </TimelineSection>
            </Wrapper>
        </Container>
    );
};

export default Education;