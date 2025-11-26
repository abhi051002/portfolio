import React, { useEffect, useState } from "react";
import {
  Nav,
  NavLink,
  NavbarContainer,
  Span,
  NavLogo,
  NavItems,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink,
  MobileMenuItems,
  MobileMenuButton,
} from "./NavbarStyledComponent";

import { FaBars } from "react-icons/fa";
import { usePortfolio } from "../../context/PortfolioContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { bioData } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      // You can adjust this value based on when you want the navbar to change
      const isScrolled = window.scrollY > 80;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <Nav scrolled={scrolled}>
      <NavbarContainer>
        <NavLogo
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              marginBottom: 20,
              cursor: "pointer",
              marginTop: 20,
            }}
          >
            <div className="logos">{"<"}</div>
            <Span className="abhijit">Abhijit</Span>
            <div className="slash">{"/"}</div>
            <Span className="abhijit">Nanda</Span>
            <div className="logos">{">"}</div>
          </div>
        </NavLogo>
        <MobileIcon>
          <FaBars
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#apps">Apps</NavLink>
          <NavLink href="#experience">Work Experience</NavLink>
          <NavLink href="#articles">Articles at Medium</NavLink>
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={bioData.github} target="_blank">
            Github Profile
          </GitHubButton>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileMenuItems>
              <MobileLink href="#about" onClick={() => setIsOpen(false)}>
                About
              </MobileLink>
              <MobileLink href="#skills" onClick={() => setIsOpen(false)}>
                Skills
              </MobileLink>
              <MobileLink href="#experience" onClick={() => setIsOpen(false)}>
                Experience
              </MobileLink>
              <MobileLink href="#apps" onClick={() => setIsOpen(false)}>
                Apps
              </MobileLink>
              <MobileLink href="#articles" onClick={() => setIsOpen(false)}>
                Articles
              </MobileLink>
            </MobileMenuItems>

            <MobileMenuButton href={bioData.github} target="_blank">
              Github Profile
            </MobileMenuButton>
          </MobileMenu>
        )}
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileMenuItems>
              <MobileLink href="#about" onClick={() => setIsOpen(false)}>
                About
              </MobileLink>
              <MobileLink href="#skills" onClick={() => setIsOpen(false)}>
                Skills
              </MobileLink>
              <MobileLink href="#apps" onClick={() => setIsOpen(false)}>
                Apps
              </MobileLink>
              <MobileLink href="#experience" onClick={() => setIsOpen(false)}>
                Experience
              </MobileLink>
              <MobileLink href="#articles" onClick={() => setIsOpen(false)}>
                Articles
              </MobileLink>
            </MobileMenuItems>

            <MobileMenuButton href={bioData.github} target="_blank">
              Github Profile
            </MobileMenuButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
