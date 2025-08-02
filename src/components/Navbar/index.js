import React from "react";
import { motion } from "framer-motion";
import { ButtonContainer, GitHubButton, LogoContainer, MobileGitHubButton, MobileLink, Nav, NavbarContainer, NavItems, NavLogo, MobileMenu, NavLink } from "./NavbarStyledComponent";
import { Bio } from "../../data/constants";
import { MenuIcon } from "./MenuIcon";

const EnhancedNavbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    }
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    }
  };

  return (
    <>
      <Nav
        scrolled={scrolled}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <NavbarContainer>
          <NavLogo
            variants={logoVariants}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <LogoContainer
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="logo-bracket">{"<"}</span>
              <span className="logo-name">Abhijit</span>
              <span className="logo-slash">{"/"}</span>
              <span className="logo-name">Nanda</span>
              <span className="logo-bracket">{">"}</span>
            </LogoContainer>
          </NavLogo>

          <MenuIcon
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />

          <NavItems>
            {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item, index) => (
              <motion.li key={item} variants={itemVariants}>
                <NavLink
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item}
                </NavLink>
              </motion.li>
            ))}
          </NavItems>

          <ButtonContainer>
            <GitHubButton
              href={Bio.github}
              target="_blank"
              variants={itemVariants}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Github Profile
            </GitHubButton>
          </ButtonContainer>
        </NavbarContainer>
      </Nav>

      {isOpen && (
        <MobileMenu
          isOpen={isOpen}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
            <MobileLink
              key={item}
              href={`#${item.toLowerCase()}`}
              variants={mobileItemVariants}
              onClick={() => setIsOpen(false)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item}
            </MobileLink>
          ))}

          <MobileGitHubButton
            href={Bio.github}
            target="_blank"
            variants={mobileItemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Github Profile
          </MobileGitHubButton>
        </MobileMenu>
      )}
    </>
  );
};

export default EnhancedNavbar;