import React from 'react';
import { education } from '../../data/constants';
import EducationCard from '../Cards/EducationCard';
import { Container, Wrapper, Title, Description, TimelineContainer, TimelineDot, TimelineItem, TimelineWrapper } from './EducationStyle';

const Education = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const timelineVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: -50,
            y: 30
        },
        visible: (index) => ({
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.7,
                delay: index * 0.2,
                ease: "easeOut"
            }
        })
    };

    return (
        <Container
            id="education"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <Wrapper>
                <Title variants={childVariants}>
                    Education
                </Title>
                <Description variants={childVariants}>
                    My education has been a journey of self-discovery and growth. My educational details are as follows.
                </Description>

                <TimelineContainer
                    variants={timelineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <TimelineWrapper>
                        {education.map((edu, index) => (
                            <TimelineItem
                                key={edu.id}
                                custom={index}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                $isEven={index % 2 === 1}
                            >
                                <TimelineDot
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    whileHover={{
                                        scale: 1.4,
                                        boxShadow: "0 0 30px rgba(139, 92, 246, 0.8)"
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1
                                    }}
                                    viewport={{ once: true }}
                                />
                                <EducationCard education={edu} index={index} />
                            </TimelineItem>
                        ))}
                    </TimelineWrapper>
                </TimelineContainer>
            </Wrapper>
        </Container>
    );
};

export default Education;