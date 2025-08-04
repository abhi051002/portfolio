import React from 'react';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Bio } from '../../data/constants';
import {
  FooterContainer,
  FooterWrapper,
  Logo,
  Nav,
  NavLink,
  ContactInfo,
  ContactInfos,
  SocialMediaIcon,
  SocialMediaIcons,
  Copyright,
  ContactInfoText,
  FooterSection,
  Divider,
  ContactItem,
  BackToTop
} from './FooterStyle';

function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }
    })
  };

  const scrollToTop = () => {
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FacebookIcon />, href: Bio.facebook, name: 'Facebook' },
    { icon: <TwitterIcon />, href: Bio.twitter, name: 'Twitter' },
    { icon: <LinkedInIcon />, href: Bio.linkedin, name: 'LinkedIn' },
    { icon: <InstagramIcon />, href: Bio.insta, name: 'Instagram' }
  ];

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <FooterContainer>
      <FooterWrapper
        as={motion.footer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <BackToTop
          as={motion.button}
          onClick={scrollToTop}
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            y: -5,
            boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          ↑
        </BackToTop>

        <FooterSection variants={itemVariants}>
          <Logo
            as={motion.h1}
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
            transition={{ duration: 0.3 }}
          >
            Abhijit Nanda
          </Logo>
        </FooterSection>

        <FooterSection variants={itemVariants}>
          <Nav>
            {navItems.map((item, index) => (
              <NavLink
                key={item.label}
                href={item.href}
                as={motion.a}
                custom={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: (index) => ({
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }
                  })
                }}
                whileHover={{
                  y: -3,
                  color: "#8b5cf6",
                  textShadow: "0 0 8px rgba(139, 92, 246, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </NavLink>
            ))}
          </Nav>
        </FooterSection>

        <Divider
          as={motion.div}
          variants={itemVariants}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <FooterSection variants={itemVariants}>
          <ContactInfo>
            <ContactItem
              as={motion.div}
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <EmailIcon />
              <ContactInfoText>
                Email:
                <ContactInfos href="mailto:abhijitnanda8249@gmail.com">
                  abhijitnanda8249@gmail.com
                </ContactInfos>
              </ContactInfoText>
            </ContactItem>

            <ContactItem
              as={motion.div}
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <PhoneIcon />
              <ContactInfoText>
                Phone:
                <ContactInfos href="tel:+918249001710">
                  +91 8249001710
                </ContactInfos>
              </ContactInfoText>
            </ContactItem>
          </ContactInfo>
        </FooterSection>

        <FooterSection variants={itemVariants}>
          <SocialMediaIcons>
            {socialLinks.map((social, index) => (
              <SocialMediaIcon
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                as={motion.a}
                custom={index}
                variants={socialVariants}
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  color: "#8b5cf6",
                  boxShadow: "0 5px 15px rgba(139, 92, 246, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                title={social.name}
              >
                {social.icon}
              </SocialMediaIcon>
            ))}
          </SocialMediaIcons>
        </FooterSection>

        <Divider
          as={motion.div}
          variants={itemVariants}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        <Copyright
          as={motion.p}
          variants={itemVariants}
          whileHover={{
            color: "#8b5cf6",
            textShadow: "0 0 10px rgba(139, 92, 246, 0.3)"
          }}
        >
          &copy; {currentYear} Abhijit Nanda. All rights reserved. Made with ❤️
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;