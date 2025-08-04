import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 100px 0;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(132, 59, 206, 0.1) 0%,
    rgba(236, 72, 153, 0.08) 25%,
    rgba(6, 182, 212, 0.06) 50%,
    rgba(132, 59, 206, 0.08) 75%,
    rgba(132, 59, 206, 0.1) 100%
  );
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(139, 92, 246, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
  
  @media (max-width: 960px) {
    padding: 60px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 40px;
  z-index: 2;
`;

export const Title = styled(motion.h1)`
  font-size: 56px;
  text-align: center;
  font-weight: 700;
  background: linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
  margin-bottom: 16px;
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @media (max-width: 768px) {
    font-size: 42px;
  }
  
  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

export const Desc = styled(motion.p)`
  font-size: 20px;
  text-align: center;
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary || 'rgba(255, 255, 255, 0.8)'};
  line-height: 1.6;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 0 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const FormContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom:20px;
`;

export const ContactForm = styled(motion.form)`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background: rgba(23, 23, 33, 0.8);
  backdrop-filter: blur(20px);
  padding: 48px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  gap: 24px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4);
  }
  
  @media (max-width: 768px) {
    padding: 32px;
    margin: 0 20px;
  }
  
  @media (max-width: 480px) {
    padding: 24px;
    margin: 0 16px;
  }
`;

export const ContactTitle = styled(motion.h2)`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  
  span:first-child {
    font-size: 32px;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
    
    span:first-child {
      font-size: 28px;
    }
  }
`;

export const InputGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  margin-left: 4px;
`;

export const ContactInput = styled(motion.input)`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  border-radius: 12px;
  padding: 16px 20px;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    border-color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 15px;
  }
`;

export const ContactInputMessage = styled(motion.textarea)`
  width: 100%;
  min-height: 140px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  border-radius: 12px;
  padding: 16px 20px;
  transition: all 0.3s ease;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    border-color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 480px) {
    padding: 14px 16px;
    font-size: 15px;
    min-height: 120px;
  }
`;

export const ContactButton = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  padding: 18px 24px;
  border-radius: 12px;
  border: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(139, 92, 246, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  span:last-child {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    padding: 16px 20px;
  }
`;

export const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #10b981;
  padding: 16px 24px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  backdrop-filter: blur(10px);
`;