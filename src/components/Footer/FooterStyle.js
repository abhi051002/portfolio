import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  padding: 2.5rem 0 2rem;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg};
  margin-top : -1px;
`;


export const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

export const Logo = styled.h1`
  font-weight: 600;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 0.03em;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    transform: translateY(-2px);
  }
`;

export const Nav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.75rem;
    font-size: 0.9rem;
  }
`;

export const NavLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  padding-bottom: 3px;
  transition: color 0.2s ease, transform 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0;
    background: ${({ theme }) => theme.primary};
    transition: width 0.25s ease-in-out;
  }

  &:hover {
    transform: translateY(-1px);
    color: ${({ theme }) => theme.primary};
  }

  &:hover::after {
    width: 100%;
  }
`;

export const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;
`;

export const SocialMediaIcon = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px) scale(1.05);
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const ContactInfos = styled.a`
  margin-left: 0.35rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ContactInfoText = styled.div`
  font-size: 1rem;
`;

export const Copyright = styled.p`
  margin-top: 1.3rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
`;
