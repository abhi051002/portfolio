import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledDocument = styled.img`
  display: none;
  height: 70px;
  width: fit-content;
  background-color: #000;
  border-radius: 10px;
  &:hover{
    cursor: pointer;
    opacity: 0.8;
  }
`;
export const Document = motion.create(StyledDocument);

export const StyledDescription = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 10px;
  @media only screen and (max-width: 768px){
    font-size: 12px;
  }
`;
export const Description = motion.create(StyledDescription);

export const StyledSpan = styled.span`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
export const Span = motion.create(StyledSpan);

export const StyledCard = styled.div`
  width: 650px;
  border-radius: 10px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  padding: 12px 16px;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease-in-out;
  &:hover{
    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
    transform: translateY(-5px);
  }
  @media only screen and (max-width: 768px){
    padding: 10px;
    gap: 8px;
    width: 300px;
  }

  &:hover ${StyledDocument}{
    display: flex;
  }

  &:hover ${StyledSpan}{
    overflow: visible;
    -webkit-line-clamp: unset;
  }
  border: 0.1px solid #854CE6;
`;
export const Card = motion.create(StyledCard);

export const StyledTop = styled.div`
  width: 100%;
  display: flex;
  gap: 12px
`;
export const Top = motion.create(StyledTop);

export const StyledImage = styled.img`
  height: 50px;
  background-color: #000;
  border-radius: 10px;
  margin-top: 4px;
  @media only screen and (max-width: 768px){
    height: 40px;
  }
`;
export const Image = motion.create(StyledImage);

export const StyledBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; 
`;
export const Body = motion.create(StyledBody);

export const StyledName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px){
    font-size: 14px;
  }
`;
export const Name = motion.create(StyledName);

export const StyledDegree = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px){
    font-size: 12px;
  }
`;
export const Degree = motion.create(StyledDegree);

export const StyledDate = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px){
    font-size: 10px;
  }
`;
export const Date = motion.create(StyledDate);

export const StyledGrade = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px){
    font-size: 12px;
  }
`;
export const Grade = motion.create(StyledGrade);