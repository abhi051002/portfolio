import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledContainer = styled.div`
  background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);
  padding: 80px 0 80px 0px;
`;

export const Container = motion.create(StyledContainer);

export const StyledWrapper = styled.div`
  max-width: 1550px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 10px 0 100px 0;
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
    padding: 0 20px;
  }
`;

export const Description = motion.create(StyledDescription);

export const StyledCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  grid-auto-rows: minmax(100px, auto);
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CardContainer = motion.create(StyledCardContainer);