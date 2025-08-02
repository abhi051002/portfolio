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

export const TimelineWrapper = styled.div`
    width: 100%;
    position: relative;
    
    /* Enhanced Timeline Styling */
    .MuiTimeline-root {
        padding: 0;
        margin: 0;
    }
    
    .MuiTimelineItem-root {
        min-height: 120px;
        
        &::before {
            flex: 0;
            padding: 0;
        }
        
        @media (max-width: 768px) {
            min-height: 100px;
        }
    }
    
    .MuiTimelineContent-root {
        padding-left: 24px !important;
        
        @media (max-width: 768px) {
            padding-left: 16px !important;
        }
    }
    
    .MuiTimelineSeparator-root {
        position: relative;
        
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(139, 92, 246, 0.1);
            filter: blur(8px);
            z-index: -1;
        }
    }
    
    .MuiTimelineDot-root {
        border-width: 2px !important;
        width: 16px;
        height: 16px;
        margin: 0;
        box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
        transition: all 0.3s ease;
        
        &:hover {
            transform: scale(1.2);
            box-shadow: 0 0 0 8px rgba(139, 92, 246, 0.2);
        }
        
        @media (max-width: 768px) {
            width: 14px;
            height: 14px;
        }
    }
    
    .MuiTimelineConnector-root {
        width: 2px;
        background: linear-gradient(180deg, #8b5cf6, #ec4899) !important;
        margin: 8px 0;
        border-radius: 1px;
        position: relative;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 100%;
            background: rgba(139, 92, 246, 0.3);
            filter: blur(2px);
            z-index: -1;
        }
    }
    
    /* Experience Card Enhancements */
    .experience-card {
        background: rgba(255, 255, 255, 0.03) !important;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(139, 92, 246, 0.15) !important;
        border-radius: 16px !important;
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
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), transparent);
        }
        
        &:hover {
            border-color: rgba(139, 92, 246, 0.3) !important;
            box-shadow: rgba(139, 92, 246, 0.2) 0px 8px 32px !important;
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
    SectionBadge
};

export default ExperienceStyles;