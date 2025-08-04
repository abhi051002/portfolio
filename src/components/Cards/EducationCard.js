import React from 'react';
import { motion } from 'framer-motion';
import { Card, Top, Image, Body, Name, Degree, Grade, Date, Description, Span } from './Styles/EducationCardStyle';

const EducationCard = ({ education, index }) => {
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        hover: {
            y: -10,
            scale: 1.02,
            boxShadow: "0 16px 48px rgba(139, 92, 246, 0.3)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3 }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: custom * 0.1,
                ease: "easeOut"
            }
        })
    };

    return (
        <Card
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
            layoutId={`education-card-${index}`}
        >
            <Top>
                <Image
                    src={education.img}
                    alt={education.school}
                    variants={imageVariants}
                    whileHover="hover"
                />
                <Body>
                    <Name
                        custom={0}
                        variants={textVariants}
                    >
                        {education.school}
                    </Name>
                    <Degree
                        custom={1}
                        variants={textVariants}
                    >
                        {education.degree}
                    </Degree>
                    <Date
                        custom={2}
                        variants={textVariants}
                    >
                        {education.date}
                    </Date>
                </Body>
            </Top>

            {education.grade && (
                <Grade
                    custom={3}
                    variants={textVariants}
                >
                    <b>Grade: </b>{education.grade}
                </Grade>
            )}

            {education.percentage && (
                <Grade
                    custom={4}
                    variants={textVariants}
                >
                    <b>Percentage: </b>{education.percentage}
                </Grade>
            )}

            {education.desc && (
                <Description
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                            duration: 0.5,
                            delay: 0.3,
                            ease: "easeOut"
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <Span>
                        {education.desc}
                    </Span>
                </Description>
            )}
        </Card>
    );
};

export default EducationCard;