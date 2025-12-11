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
  MobileMenuItems,
  MobileMenuButton,
  MobileLink,
  MobileMenuItem,
} from "./NavbarStyledComponent";

import { FaBars } from "react-icons/fa";
import { usePortfolio } from "../../context/PortfolioContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bioData } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClose = () => setIsOpen(false);

  return (
    <Nav scrolled={scrolled}>
      <NavbarContainer>
        <NavLogo
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>

        <NavItems>
          <li>
            <NavLink href="#about">About</NavLink>
          </li>
          <li>
            <NavLink href="#skills">Skills</NavLink>
          </li>
          <li>
            <NavLink href="#apps">Apps</NavLink>
          </li>
          <li>
            <NavLink href="#experience">Experience</NavLink>
          </li>
          <li>
            <NavLink href="#articles">Articles</NavLink>
          </li>
        </NavItems>

        <ButtonContainer>
          <GitHubButton href={bioData.github} target="_blank">
            Github Profile
          </GitHubButton>
        </ButtonContainer>

        <MobileMenu isOpen={isOpen}>
          <MobileMenuItems>
            <MobileMenuItem>
              <MobileLink href="#about" onClick={handleMenuClose}>
                About
              </MobileLink>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileLink href="#skills" onClick={handleMenuClose}>
                Skills
              </MobileLink>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileLink href="#apps" onClick={handleMenuClose}>
                Apps
              </MobileLink>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileLink href="#experience" onClick={handleMenuClose}>
                Experience
              </MobileLink>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileLink href="#articles" onClick={handleMenuClose}>
                Articles
              </MobileLink>
            </MobileMenuItem>
          </MobileMenuItems>

          <MobileMenuButton href={bioData.github} target="_blank">
            Github Profile
          </MobileMenuButton>
        </MobileMenu>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
