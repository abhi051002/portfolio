import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';

// Global styles for animations
export const GlobalStyle = createGlobalStyle`
  background: linear-gradient(135deg, #0f0f23 0%, #1a0a2e 25%, #16213e 50%, #0f0f23 100%);
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const Container = styled.div`
  background: linear-gradient(135deg, #0f0f23 0%, #1a0a2e 25%, #16213e 50%, #0f0f23 100%);
  display:flex;
  justify-content:center;
  align-item:center;
`;
export const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  padding: 100px 50px;
  overflow: hidden;
  max-width:1400px;
  margin:auto;
  width:100%;


  @media (max-width: 1200px) {
    padding: 80px 40px;
  }
  
  @media (max-width: 960px) {
    padding: 60px 24px;
    min-height: auto; /* Consider changing this to 100vh for full centering on mobile */
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
  
  @media (max-width: 640px) {
    padding: 32px 16px;
  }
  
  @media (max-width: 480px) {
    margin-top:60px;
    padding: 24px 12px;
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

export const AnimatedOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
  
  &:nth-child(1) {
    width: 400px;
    height: 400px;
    background: linear-gradient(45deg, #8b5cf6, #3b82f6);
    top: 10%;
    right: 10%;
    
    @media (max-width: 1200px) {
      width: 300px;
      height: 300px;
    }
    
    @media (max-width: 768px) {
      width: 200px;
      height: 200px;
      filter: blur(30px);
    }
    
    @media (max-width: 480px) {
      width: 150px;
      height: 150px;
      filter: blur(20px);
    }
  }
  
  &:nth-child(2) {
    width: 300px;
    height: 300px;
    background: linear-gradient(45deg, #ec4899, #8b5cf6);
    bottom: 20%;
    left: 15%;
    
    @media (max-width: 1200px) {
      width: 250px;
      height: 250px;
    }
    
    @media (max-width: 768px) {
      width: 180px;
      height: 180px;
      filter: blur(30px);
    }
    
    @media (max-width: 480px) {
      width: 120px;
      height: 120px;
      filter: blur(20px);
    }
  }
  
  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, #06b6d4, #8b5cf6);
    top: 50%;
    left: 50%;
    
    @media (max-width: 1200px) {
      width: 180px;
      height: 180px;
    }
    
    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
      filter: blur(30px);
    }
    
    @media (max-width: 480px) {
      width: 80px;
      height: 80px;
      filter: blur(20px);
    }
  }
`;

export const FloatingParticle = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  border-radius: 50%;
  opacity: 0.7;
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  z-index: 10;
  gap: 40px;

  @media (max-width: 1200px) {
    max-width: 1200px;
    gap: 30px;
  }

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 50px;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    gap: 40px;
  }
  
  @media (max-width: 640px) {
    gap: 30px;
  }
`;

export const HeroLeftContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1200px) {
    max-width: 600px;
  }
  
  @media (max-width: 960px) {
    align-items: center;
    text-align: center;
    max-width: 100%;
  }

  /* Mobile image container inside left container */
  .mobile-image {
    display: none;
    margin: 30px 0;
    
    @media (max-width: 960px) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 350px;
      align-self: center;
    }
    
    @media (max-width: 768px) {
      max-width: 320px;
      margin: 25px 0;
    }
    
    @media (max-width: 640px) {
      max-width: 280px;
      margin: 20px 0;
    }
    
    @media (max-width: 480px) {
      max-width: 250px;
      margin: 15px 0;
    }
  }
`;

export const HeroRightContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 1200px) {
    max-width: 500px;
  }

  /* Desktop image - hide on mobile */
  &.desktop-image {
    @media (max-width: 960px) {
      display: none;
    }
  }

  /* Mobile image styling - only applies when inside left container */
  &.mobile-image {
    display: none;
    
    @media (max-width: 960px) {
      display: flex;
      max-width: 350px;
    }
    
    @media (max-width: 768px) {
      max-width: 320px;
    }
    
    @media (max-width: 640px) {
      max-width: 280px;
    }
    
    @media (max-width: 480px) {
      max-width: 250px;
    }
  }
`;

export const WelcomeBadge = styled(motion.div)`
  display: inline-block;
  padding: 8px 20px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50px;
  color: #a855f7;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
`;

export const Title = styled(motion.h1)`
  font-weight: 800;
  font-size: clamp(25px, 5vw, 50px);
  line-height: 1.1;
  margin-bottom: 20px;
  
  .normal-text {
    color: #ffffff;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
    line-height: 1.2;
  }
`;

export const TypewriterContainer = styled(motion.div)`
  font-size: clamp(12px, 3vw, 30px);
  font-weight: 600;
  margin-bottom: 30px;
  color: #e2e8f0;
  
  .highlight {
    color: #a855f7;
    position: relative;
  }
  
  .cursor {
    color: #a855f7;
    animation: blink 1s infinite;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }

  /* Adjust margin when mobile image follows */
  @media (max-width: 960px) {
    margin-bottom: 0;
  }
`;

export const SubTitle = styled(motion.p)`
  font-size: clamp(10px, 2vw, 15px);
  line-height: 1.6;
  margin-bottom: 40px;
  color: #94a3b8;
  max-width: 600px;

  @media (max-width: 960px) {
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
  }

  @media (max-width: 640px) {
    margin-bottom: 28px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
    line-height: 1.5;
  }
`;

export const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    gap: 16px;
    margin-bottom: 32px;
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

export const PrimaryButton = styled(motion.a)`
  display: inline-block;
  padding: 16px 32px;
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(139, 92, 246, 0.3);
  white-space: nowrap;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 15px;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    max-width: 280px;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 14px;
    max-width: 240px;
  }
`;

export const SecondaryButton = styled(motion.a)`
  padding: 16px 32px;
  background: transparent;
  color: #a855f7;
  border: 2px solid #a855f7;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-decoration: none;
  
  &:hover {
    background: #a855f7;
    color: white;
    box-shadow: 0 10px 30px rgba(168, 85, 247, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 15px;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    max-width: 280px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 14px;
    max-width: 240px;
  }
`;

export const SocialContainer = styled(motion.div)`
  display: flex;
  gap: 15px;
  justify-content: center;
  
  @media (max-width: 960px) {
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const SocialIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #a855f7;
    background: rgba(168, 85, 247, 0.1);
  }
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    background: #a855f7;
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    
    &::after {
      width: 18px;
      height: 18px;
    }
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    
    &::after {
      width: 16px;
      height: 16px;
    }
  }
`;

export const ImageContainer = styled(motion.div)`
  position: relative;
  width: 400px;
  height: 400px;
  
  @media (max-width: 1200px) {
    width: 350px;
    height: 350px;
  }
  
  @media (max-width: 960px) {
    width: 320px;
    height: 320px;
  }
  
  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
  }
  
  @media (max-width: 640px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 480px) {
    width: 220px;
    height: 220px;
  }
  
  @media (max-width: 360px) {
    width: 200px;
    height: 200px;
  }
`;

export const RotatingRing = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  border: 2px solid;
  opacity: 0.3;
  
  &:nth-child(1) {
    inset: -20px;
    border-color: #8b5cf6;
    animation: rotate 20s linear infinite;
  }
  
  &:nth-child(2) {
    inset: -40px;
    border-color: #ec4899;
    animation: rotate 15s linear infinite reverse;
  }
`;

export const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  padding: 4px;
  
  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    filter: blur(20px);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 0.5;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 12px;
  height: 12px;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  border-radius: 50%;
  
  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }
  
  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }
`;