import React, { useState, useEffect } from 'react';
import { Bio } from '../../data/constants';
import { AnimatedOrb, HeroBg, FloatingElement, FloatingParticle, GlobalStyle, HeroContainer, HeroInnerContainer, HeroLeftContainer, Title, SubTitle, TypewriterContainer, ButtonContainer, PrimaryButton, SecondaryButton, HeroRightContainer, ImageContainer, RotatingRing, ImageWrapper, ProfileImage, Container } from './HeroSectionStyle';
import HeroImage from '../../Image/HeroImage.jpeg';
import { MobileImageSection } from './MobileImageSection';

// Typewriter Effect Component
const TypewriterEffect = ({ strings }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = strings[currentStringIndex];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentStringIndex((prev) => (prev + 1) % strings.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, strings, currentStringIndex]);

  return (
    <span className="highlight">
      {currentText}
      <span className="cursor">|</span>
    </span>
  );
};

// Background Animation Component
const BackgroundAnimation = () => {
  return (
    <HeroBg>
      <AnimatedOrb
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <AnimatedOrb
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <AnimatedOrb
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <FloatingParticle
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </HeroBg>
  );
};

const EnhancedHeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

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

  const imageVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.8,
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <HeroContainer id="about">
          <BackgroundAnimation />

          <HeroInnerContainer>
            <HeroLeftContainer
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Title variants={itemVariants}>
                <span className="normal-text">Hi, I'm</span>
                <span className="gradient-text">{Bio.name}</span>
              </Title>

              <TypewriterContainer variants={itemVariants}>
                I'm a <TypewriterEffect strings={Bio.roles} />
              </TypewriterContainer>

              {/* Mobile Image - positioned after TypewriterContainer */}
              <MobileImageSection imageVariants={imageVariants} />

              <SubTitle variants={itemVariants}>
                {Bio.description}
              </SubTitle>

              <ButtonContainer variants={itemVariants}>
                <PrimaryButton
                  href={Bio.resume}
                  target="_blank"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Check My Resume
                </PrimaryButton>

                <SecondaryButton
                  href='#projects'
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </SecondaryButton>
              </ButtonContainer>
            </HeroLeftContainer>

            {/* Desktop Image - hidden on mobile */}
            <HeroRightContainer
              className="desktop-image"
              initial="hidden"
              animate="visible"
            >
              <ImageContainer variants={imageVariants}>
                <RotatingRing />
                <RotatingRing />

                <ImageWrapper
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ProfileImage
                    src={HeroImage}
                    alt={Bio.name}
                  />
                </ImageWrapper>
              </ImageContainer>
            </HeroRightContainer>
          </HeroInnerContainer>
        </HeroContainer>
      </Container>
    </>
  );
};

export default EnhancedHeroSection;