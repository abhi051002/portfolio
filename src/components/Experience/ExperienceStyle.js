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
        rgba(15, 15, 35, 0.95) 0%, 
        rgba(26, 10, 46, 0.95) 25%, 
        rgba(22, 33, 62, 0.95) 50%, 
        rgba(15, 15, 35, 0.95) 100%
    );
    overflow: hidden;

    @media (max-width: 960px) {
        padding: 80px 20px;
    }
    
    @media (max-width: 768px) {
        padding: 60px 16px;
    }
`;

export const BackgroundOrb = styled(motion.div)`
    position: absolute;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.08));
    filter: blur(50px);
    top: 15%;
    left: 5%;
    z-index: 0;
    
    @media (max-width: 768px) {
        width: 180px;
        height: 180px;
        filter: blur(35px);
    }
`;

export const Wrapper = styled(motion.div)`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    gap: 20px;
    z-index: 2;
    
    @media (max-width: 960px) {
        max-width: 900px;
        gap: 16px;
    }
`;

export const SectionBadge = styled.div`
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
    margin-bottom: 16px;
    backdrop-filter: blur(10px);
    
    @media (max-width: 768px) {
        font-size: 12px;
        padding: 6px 16px;
        margin-bottom: 12px;
    }
`;

export const Title = styled(motion.div)`
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

export const Description = styled(motion.div)`
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

export const StatsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 30px 0 40px 0;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
        gap: 20px;
        margin: 24px 0 32px 0;
    }
    
    @media (max-width: 480px) {
        gap: 16px;
        margin: 20px 0 28px 0;
    }
`;

export const StatItem = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 24px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
    }
    
    &:nth-child(2) {
        border-color: rgba(236, 72, 153, 0.2);
        
        &::before {
            background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.5), transparent);
        }
    }
    
    &:nth-child(3) {
        border-color: rgba(6, 182, 212, 0.2);
        
        &::before {
            background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent);
        }
    }
    
    @media (max-width: 768px) {
        padding: 16px 20px;
    }
    
    @media (max-width: 480px) {
        padding: 14px 18px;
        min-width: 100px;
    }
`;

export const StatNumber = styled.div`
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary || '#ffffff'};
    margin-bottom: 4px;
    
    ${StatItem}:nth-child(1) & {
        background: linear-gradient(135deg, #8b5cf6, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    ${StatItem}:nth-child(2) & {
        background: linear-gradient(135deg, #ec4899, #f472b6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    ${StatItem}:nth-child(3) & {
        background: linear-gradient(135deg, #06b6d4, #0891b2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
`;

export const StatLabel = styled.div`
    font-size: clamp(12px, 2vw, 14px);
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary || '#94a3b8'};
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const TimelineSection = styled(motion.div)`
    width: 100%;
    max-width: 1000px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    
    @media (max-width: 768px) {
        margin-top: 16px;
    }
`;

export const TimelineContainer = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  margin-top: 40px;
  position: relative;
  
  @media (max-width: 768px) {
    margin-top: 32px;
  }
`;

export const ExperienceCardComponent = styled(motion.div)`
  width: 45%;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(139, 92, 246, 0.15);
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
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: subtract;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  // Tablet breakpoint
  @media (max-width: 1024px) {
    width: 48%;
    padding: 24px;
  }
  
  // Small tablet/large phone breakpoint
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    margin-left: 0;
    border-radius: 16px;
  }
  
  // Mobile breakpoint
  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
  }
  
  // Very small mobile screens
  @media (max-width: 360px) {
    padding: 14px;
  }
`;

export const CardContent = styled.div`
  flex: 1;
`;

// Enhanced CardHeader for better mobile layout
export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    margin-bottom: 14px;
  }
`;

// Enhanced CompanyLogo with better responsive sizing
export const CompanyLogo = styled(motion.img)`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid rgba(139, 92, 246, 0.3);
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    border-radius: 8px;
  }
  
  @media (max-width: 360px) {
    width: 40px;
    height: 40px;
  }
`;

// Enhanced Role with better responsive typography
export const Role = styled(motion.h3)`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 6px;
  line-height: 1.3;
  
  @media (max-width: 480px) {
    margin-bottom: 4px;
  }
`;

// Enhanced Company with responsive sizing
export const Company = styled(motion.p)`
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 600;
  color: #8b5cf6;
  margin-bottom: 4px;
  line-height: 1.2;
  
  @media (max-width: 480px) {
    margin-bottom: 3px;
  }
`;

// Enhanced Duration with better mobile formatting
export const Duration = styled(motion.p)`
  font-size: clamp(12px, 1.8vw, 14px);
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 2px;
  line-height: 1.2;
  
  @media (max-width: 480px) {
    font-size: 11px;
    margin-bottom: 1px;
  }
`;

// Enhanced ExperienceYear
export const ExperienceYear = styled(motion.p)`
  font-size: clamp(11px, 1.6vw, 13px);
  font-weight: 600;
  color: #ec4899;
  line-height: 1.2;
`;

// Enhanced Description with better readability
export const Description2 = styled(motion.p)`
  font-size: clamp(14px, 2vw, 15px);
  font-weight: 400;
  color: #e2e8f0;
  line-height: 1.6;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    line-height: 1.5;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 14px;
    line-height: 1.4;
  }
`;

// Enhanced SkillsContainer with better mobile layout
export const SkillsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  
  @media (max-width: 480px) {
    gap: 6px;
    margin-top: 12px;
  }
  
  @media (max-width: 360px) {
    gap: 4px;
    margin-top: 10px;
    justify-content: center;
  }
`;

// Enhanced SkillTag with better responsive sizing
export const SkillTag = styled(motion.span)`
  padding: 6px 12px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
  font-size: clamp(10px, 1.5vw, 12px);
  font-weight: 500;
  color: #a855f7;
  backdrop-filter: blur(10px);
  white-space: nowrap;
  
  @media (max-width: 480px) {
    padding: 4px 8px;
    border-radius: 16px;
  }
  
  @media (max-width: 360px) {
    padding: 3px 6px;
    border-radius: 12px;
  }
`;

// Enhanced TimelineWrapper for better mobile experience
export const TimelineWrapper = styled.div`
  position: relative;
  padding: 40px 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
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

// Enhanced TimelineItem for better mobile spacing
export const TimelineItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  position: relative;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: 768px) {
      flex-direction: row;
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
    padding-left: 80px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 32px;
    padding-left: 70px;
  }
  
  @media (max-width: 360px) {
    margin-bottom: 28px;
    padding-left: 60px;
  }
`;

// Enhanced TimelineDot for better mobile interaction
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
    left: 25px;
    width: 14px;
    height: 14px;
    border-width: 2px;
    
    &::before {
      inset: -5px;
      filter: blur(5px);
    }
  }
`;

const ExperienceStyles = {
    Container,
    Wrapper,
    Title,
    Description,
    TimelineSection,
    BackgroundOrb,
    TimelineWrapper,
    StatsContainer,
    StatItem,
    StatNumber,
    StatLabel,
    SectionBadge,
    TimelineContainer,
    TimelineDot,
    TimelineItem,
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
};

export default ExperienceStyles;