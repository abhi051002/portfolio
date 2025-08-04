import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;
  min-height: 100vh;

  @media (max-width: 960px) {
    padding: 60px 20px;
  }
`;
export const Container = motion.create(StyledContainer);

export const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`;
export const Wrapper = motion.create(StyledWrapper);

export const StyledTitle = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;
export const Title = motion.create(StyledTitle);

export const StyledDescription = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 20px;
  }
`;
export const Description = motion.create(StyledDescription);

export const TimelineContainer = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  margin-top: 50px;
  position: relative;
  
  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const TimelineWrapper = styled.div`
  position: relative;
  padding: 40px 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 51%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, transparent, #8b5cf6, #ec4899, #06b6d4, transparent);
    border-radius: 2px;
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 30px;
      width: 2px;
    }
    
    @media (max-width: 480px) {
      left: 25px;
      width: 2px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 32px 0;
  }
  
  @media (max-width: 480px) {
    padding: 24px 0;
  }
`;

export const TimelineItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  position: relative;
  width: 100%;
  
  ${({ $isEven }) => $isEven ? `
    justify-content: flex-end;
    
    & > div:last-child {
      margin-right: 60px;
    }
    
    @media (max-width: 768px) {
      justify-content: flex-start;
      
      & > div:last-child {
        margin-right: 0;
        margin-left: 80px;
      }
    }
  ` : `
    justify-content: flex-start;
    
    & > div:last-child {
      margin-left: 60px;
    }
    
    @media (max-width: 768px) {
      & > div:last-child {
        margin-left: 80px;
      }
    }
  `}
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 50px;
    justify-content: flex-start !important;
  }
`;

export const TimelineDot = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border: 4px solid rgba(15, 15, 35, 1);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    background: rgba(139, 92, 246, 0.2);
    filter: blur(8px);
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    left: 30px;
    width: 16px;
    height: 16px;
    border-width: 3px;
    
    &::before {
      inset: -6px;
      filter: blur(6px);
    }
  }
  
  @media (max-width: 480px) {
    left: 18px;
    width: 14px;
    height: 14px;
    border-width: 2px;
    
    &::before {
      inset: -5px;
      filter: blur(5px);
    }
  }
`;

