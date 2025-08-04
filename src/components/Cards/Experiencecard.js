import React from "react";
import {
  ExperienceCardComponent,
  CardHeader,
  CompanyLogo,
  CardContent,
  Role,
  Company,
  Duration,
  ExperienceYear,
  Description2,
  SkillsContainer,
  SkillTag
} from '../Experience/ExperienceStyle';

const ExperienceCard = ({ experience, index }) => {
  const formatDate = (input) => {
    const [, month, year] = input.split("/");
    const date = new Date(`${month}/01/${year}`);
    return date.toLocaleDateString("en-us", {
      month: "long",
      year: "numeric"
    });
  };

  const experienceInYear = (start, end) => {
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

    // More responsive duration display
    if (totalMonths < 12) {
      return `${totalMonths} Month${totalMonths > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(totalMonths / 12);
      const remainingMonths = totalMonths % 12;
      if (remainingMonths === 0) {
        return `${years} Year${years > 1 ? 's' : ''}`;
      } else {
        return `${years}y ${remainingMonths}m`;
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Responsive hover effects
  const getHoverEffects = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      // Reduced hover effects for mobile
      return {
        scale: 1.01,
        y: -2,
        transition: { duration: 0.2 }
      };
    }
    return {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 }
    };
  };

  return (
    <ExperienceCardComponent
      variants={cardVariants}
      whileHover={getHoverEffects()}
      whileTap={{ scale: 0.98 }} // Add tap feedback for mobile
    >
      <CardHeader>
        <CompanyLogo
          src={experience.img}
          alt={experience.company}
          whileHover={{
            scale: typeof window !== 'undefined' && window.innerWidth <= 768 ? 1.05 : 1.1,
            rotate: 5
          }}
        />
        <CardContent>
          <Role variants={itemVariants}>{experience.role}</Role>
          <Company variants={itemVariants}>{experience.company}</Company>
          <Duration variants={itemVariants}>
            {`${formatDate(experience.startDate)} - ${experience.present ? "Present" : formatDate(experience.endDate)}`}
          </Duration>
          <ExperienceYear variants={itemVariants}>
            {experienceInYear(experience.startDate, experience.endDate)}
          </ExperienceYear>
        </CardContent>
      </CardHeader>

      <Description2 variants={itemVariants}>
        {experience.desc}
      </Description2>

      {experience.skills && experience.skills.length > 0 && (
        <SkillsContainer variants={itemVariants}>
          {experience.skills.map((skill, skillIndex) => (
            <SkillTag
              key={skillIndex}
              whileHover={{
                scale: typeof window !== 'undefined' && window.innerWidth <= 768 ? 1.02 : 1.05,
                backgroundColor: "rgba(139, 92, 246, 0.2)",
                borderColor: "rgba(139, 92, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }} // Add tap feedback
              transition={{ duration: 0.2 }}
            >
              {skill}
            </SkillTag>
          ))}
        </SkillsContainer>
      )}
    </ExperienceCardComponent>
  );
};

export default ExperienceCard;