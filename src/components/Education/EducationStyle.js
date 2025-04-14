import { motion } from "framer-motion";
import styled from "styled-components";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 0 80px 0px;

  @media (max-width:960px){
    padding:0;
  }
`;
export const Container = motion.create(StyledContainer);

export const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
export const Wrapper = motion.create(StyledWrapper);

export const StyledTitle = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
export const Title = motion.create(StyledTitle);

export const StyledDescription = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
export const Description = motion.create(StyledDescription);

export const StyledTimelineSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
export const TimelineSection = motion.create(StyledTimelineSection);

// Custom styled timeline components
export const StyledTimeline = styled(Timeline)`
  .MuiTimelineItem-root::before {
    flex: 0;
    padding: 0;
  }
`;

export const MotionTimelineItem = motion.create(TimelineItem);