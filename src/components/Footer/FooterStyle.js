import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(15, 15, 35, 0.95) 0%,
    rgba(23, 23, 33, 0.98) 50%,
    rgba(17, 25, 40, 0.95) 100%
  );
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6);
    background-size: 200% 100%;
    animation: gradientMove 3s ease-in-out infinite;
  }
  
  @keyframes gradientMove {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

export const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  padding: 60px 20px 40px;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  position: relative;
`;

export const BackToTop = styled.button`
  position: absolute;
  top: -25px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  z-index: 10;
  
  @media (max-width: 768px) {
    right: 20px;
    top: -20px;
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const Logo = styled.h1`
  font-weight: 700;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 20px;
  }
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  padding: 8px 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #8b5cf6, #ec4899);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Divider = styled.div`
  width: 100%;
  max-width: 800px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(139, 92, 246, 0.5) 20%,
    rgba(236, 72, 153, 0.5) 50%,
    rgba(6, 182, 212, 0.5) 80%,
    transparent 100%
  );
  transform-origin: center;
`;

export const ContactInfo = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  svg {
    color: #8b5cf6;
    font-size: 1.2rem;
  }
  
  &:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px;
    gap: 8px;
  }
`;

export const ContactInfoText = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ContactInfos = styled.a`
  color: ${({ theme }) => theme.text_secondary || '#b3b3b3'};
  text-decoration: none;
  margin-left: 8px;
  transition: all 0.3s ease;
  font-weight: 400;
  
  &:hover {
    color: #8b5cf6;
    text-decoration: underline;
  }
`;

export const SocialMediaIcons = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const SocialMediaIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.text_primary || '#ffffff'};
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  svg {
    font-size: 1.4rem;
  }
  
  &:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.5);
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    
    svg {
      font-size: 1.2rem;
    }
  }
`;

export const Copyright = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text_secondary || 'rgba(255, 255, 255, 0.7)'};
  text-align: center;
  font-weight: 400;
  line-height: 1.5;
  cursor: default;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;