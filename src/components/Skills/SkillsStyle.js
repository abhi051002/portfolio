import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 100px 0;
  background: linear-gradient(135deg, 
    rgba(15, 15, 35, 0.9) 0%, 
    rgba(26, 10, 46, 0.9) 25%, 
    rgba(22, 33, 62, 0.9) 50%, 
    rgba(15, 15, 35, 0.9) 100%
  );
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 80px 0;
  }
  
  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;

export const BackgroundOrb = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
  filter: blur(60px);
  top: 10%;
  left: 10%;
  z-index: 0;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    filter: blur(40px);
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  z-index: 2;
  padding: 0 20px;
  
  @media (max-width: 960px) {
    max-width: 900px;
  }
  
  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 16px;
  }
`;

export const Title = styled.div`
  font-size: clamp(32px, 5vw, 48px);
  text-align: center;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  position: relative;
  
  .gradient-text {
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #8b5cf6, #ec4899);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
    
    &::after {
      width: 60px;
      height: 3px;
    }
  }
`;

export const Description = styled.div`
  font-size: clamp(16px, 2.5vw, 20px);
  text-align: center;
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary || '#94a3b8'};
  line-height: 1.6;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    max-width: 90%;
    margin-bottom: 16px;
  }
`;

export const SkillsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 40px;
  justify-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
    margin-top: 32px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 28px;
  }
`;

export const Skill = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 
    rgba(139, 92, 246, 0.1) 0px 8px 32px,
    rgba(0, 0, 0, 0.1) 0px 4px 16px;
  border-radius: 20px;
  padding: 28px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
  }
  
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 24px 20px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 20px 16px;
  }
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.02) 0%, 
    rgba(236, 72, 153, 0.02) 50%, 
    rgba(6, 182, 212, 0.02) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 20px;
  
  ${Skill}:hover & {
    opacity: 1;
  }
`;

export const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
`;

export const SkillIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .icon-placeholder {
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    
    .icon-placeholder {
      width: 18px;
      height: 18px;
    }
  }
`;

export const SkillTitle = styled.h2`
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  margin: 0;
  flex: 1;
  text-align: center;
  
  @media (max-width: 480px) {
    order: -1;
    width: 100%;
  }
`;

export const SkillBadge = styled.div`
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #a855f7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 480px) {
    font-size: 11px;
    padding: 4px 10px;
  }
`;

export const SkillList = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const SkillItem = styled(motion.div)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary || '#e2e8f0'};
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  .skill-name {
    position: relative;
    z-index: 2;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 10px 14px;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 12px;
    gap: 6px;
  }
`;

export const SkillImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(1.1);
  transition: transform 0.3s ease;
  
  ${SkillItem}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
  
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;