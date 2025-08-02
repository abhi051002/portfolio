import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";


const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(139, 92, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4);
  }
`;

export const Nav = styled(motion.nav)`
  background: ${({ scrolled }) =>
    scrolled
      ? 'rgba(15, 15, 35, 0.85)'
      : 'rgba(15, 15, 35, 0.1)'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(20px)' : 'blur(5px)'};
  -webkit-backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(20px)' : 'blur(5px)'};
  border-bottom: ${({ scrolled }) =>
    scrolled ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid transparent'};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: ${({ scrolled }) =>
    scrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)'};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  @media (max-width: 960px) {
    transition: all 0.3s ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1400px;
`;

export const NavLogo = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  
  @media (max-width: 640px) {
    padding: 0;
  }
`;

export const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  
  .logo-bracket {
    color: #8b5cf6;
    font-size: 28px;
    margin: 0 2px;
    transition: all 0.3s ease;
  }
  
  .logo-name {
    margin: 0 4px;
    position: relative;
    transition: all 0.3s ease;
    
    &:first-of-type {
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  .logo-slash {
    color: #ec4899;
    margin: 0 2px;
    transform: rotate(15deg);
    transition: all 0.3s ease;
  }
  
  &:hover {
    .logo-bracket {
      color: #ec4899;
      transform: scale(1.1);
    }
    
    .logo-slash {
      transform: rotate(-15deg) scale(1.1);
      color: #8b5cf6;
    }
    
    .logo-name {
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 640px) {
    font-size: 20px;
    
    .logo-bracket {
      font-size: 24px;
    }
  }
`;

export const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 0;
  list-style: none;
  margin: 0;
 
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(motion.a)`
  color: #e2e8f0;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-decoration: none;
  position: relative;
  padding: 8px 0;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #8b5cf6, #ec4899);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateX(-50%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  
  &:hover {
    color: #8b5cf6;
    transform: translateY(-2px);
    
    &::before {
      width: 100%;
    }
    
    &::after {
      width: 120%;
      height: 40px;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const GitHubButton = styled(motion.a)`
  // border: 2px solid transparent;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
  border-image: linear-gradient(135deg, #8b5cf6, #ec4899) 1;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 45px;
  border-radius: 25px;
  color: #8b5cf6;
  cursor: pointer;
  padding: 0 24px;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width:max-content;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 25px;
    padding: 2px;
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: subtract;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
  }
  
  &:hover {
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
    animation: ${glow} 2s ease-in-out infinite;
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 0 16px;
    height: 40px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MobileIcon = styled(motion.div)`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(-50%);
    font-size: 24px;
    cursor: pointer;
    color: #e2e8f0;
    z-index: 1001;
    padding: 8px;
    border-radius: 8px;
    background: rgba(139, 92, 246, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(139, 92, 246, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      color: #8b5cf6;
      background: rgba(139, 92, 246, 0.2);
      transform: translateY(-50%) scale(1.05);
    }
  }
`;

export const MobileMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  width: 100%;
  padding: 32px 24px;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: ${slideDown} 0.3s ease-out;
  z-index: 999;
  
  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  }
`;

export const MobileLink = styled(motion.a)`
  color: #e2e8f0;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 12px;
  width: 100%;
  text-align: center;
  background: rgba(139, 92, 246, 0.05);
  border: 1px solid transparent;
  
  &:hover {
    color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const MobileGitHubButton = styled(motion.a)`
  border: 2px solid transparent;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  justify-content: center;
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 25px;
  color: #ffffff;
  cursor: pointer;
  padding: 0 32px;
  font-weight: 600;
  text-decoration: none;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;