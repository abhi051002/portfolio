import React from 'react';
import { Bio } from '../../data/constants';
import Typewriter from "typewriter-effect";
import HeroImg from "../../Image/HeroImage.jpeg";
import HeroBgAnimation from "../HeroBgAnimation";
import { HeroBg, HeroContainer, HeroInnerContainer, HeroLeftContainer, HeroRightContainer, Image, ImageContainer, ImageOverlay, ResumeButton, Span, SubTitle, TextLoop, Title } from './HeroSectionStyle';


const Hero = () => {
  // Define animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const popIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.8, 0.5, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const hoverScale = {
    scale: 1.07,
    boxShadow: "0 0 30px rgba(139, 92, 246, 0.9)",
    transition: { duration: 0.3 }
  };

  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <Title variants={fadeIn}>
              Hi, I'm <br />
              {Bio.name}
            </Title>
            <TextLoop>
              I'm a
              <Span>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                  }} />
              </Span>
            </TextLoop>
            <SubTitle variants={fadeIn}>{Bio.description}</SubTitle>
            <ResumeButton
              href={Bio.resume}
              target='_blank'
              variants={popIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Check My Resume
            </ResumeButton>
          </HeroLeftContainer>
          <HeroRightContainer
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ImageContainer
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.6
              }}
            >
              <Image
                src={HeroImg}
                alt={`${Bio.name}'s Profile`}
                whileHover={hoverScale}
              />
              <ImageOverlay animate={pulseAnimation} />
            </ImageContainer>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  )
}

export default Hero;