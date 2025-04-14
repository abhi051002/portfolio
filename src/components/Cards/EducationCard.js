import React from 'react';
import { Card, Top, Image, Body, Name, Degree, Grade, Date, Description, Span } from './Styles/EducationCardStyle';

const EducationCard = ({ education, index }) => {
    // Animation variants
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

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.4 }
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <Card
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            layoutId={`education-card-${index}`}
        >
            <Top>
                <Image
                    src={education.img}
                    variants={imageVariants}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
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
            <Grade
                custom={3}
                variants={textVariants}
            >
                <b>Grade: </b>{education.grade}
            </Grade>
            <Grade
                custom={4}
                variants={textVariants}
            >
                <b>Percentage: </b>{education.percentage}
            </Grade>
            <Description
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
            >
                <Span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
                >
                    {education.desc}
                </Span>
            </Description>
        </Card>
    );
};

export default EducationCard;