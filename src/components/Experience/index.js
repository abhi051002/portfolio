import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ExperienceCard from "../Cards/Experiencecard";
import {
  Container,
  Wrapper,
  Title,
  Description,
  TimelineSection,
} from "./ExperienceStyle";
import Loader from "../Loader/Loader";
import { usePortfolio } from "../../context/PortfolioContext";

const Experience = () => {
  const { experiences, loading, fetchExperiences } = usePortfolio();

  useEffect(() => {
    if (experiences.length === 0) {
      fetchExperiences();
    }
  }, [experiences.length,fetchExperiences]);

  const getTimelineVariants = (index) => {
    const isEven = index % 2 === 0;
    return {
      hidden: {
        x: isEven ? -50 : 50,
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 12,
          delay: index * 0.1,
        },
      },
    };
  };

  const MotionTimelineConnector = motion.create(TimelineConnector);

  return (
    <Container id="experience">
      <Wrapper>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Experience</Title>
          <Description>Here are some of my Experience</Description>
        </motion.div>

        {loading.experiences ? (
          <Loader text="Loading experiences..." size="60px" minHeight="400px" />
        ) : (
          <TimelineSection>
            <Timeline>
              {experiences && experiences.length > 0 ? (
                experiences.map((experience, index) => (
                  <motion.div
                    key={index}
                    variants={getTimelineVariants(index)}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <TimelineItem>
                      <TimelineSeparator>
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <TimelineDot variant="outlined" color="secondary" />
                        </motion.div>
                        {index !== experiences.length - 1 && (
                          <MotionTimelineConnector
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          />
                        )}
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <motion.div
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0px 5px 15px rgba(133, 76, 230, 0.2)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ExperienceCard experience={experience} />
                        </motion.div>
                      </TimelineContent>
                    </TimelineItem>
                  </motion.div>
                ))
              ) : (
                <div style={{ color: "white", textAlign: "center", padding: "40px" }}>
                  No experiences found
                </div>
              )}
            </Timeline>
          </TimelineSection>
        )}
      </Wrapper>
    </Container>
  );
};

export default Experience;