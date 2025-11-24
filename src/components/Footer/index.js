import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Bio } from "../../data/constants";
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
} from "./FooterStyle";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Abhijit Nanda</Logo>

        <Nav>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#apps">Apps</NavLink>
          <NavLink href="#experience">Work Experience</NavLink>
          <NavLink href="#articles">Articles at Medium</NavLink>
          <NavLink href="#education">Education</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Nav>

        <ContactInfo>
          <ContactInfoText>
            Email:
            <ContactInfos href={`mailto:${Bio.email}`}>{Bio.email}</ContactInfos>
          </ContactInfoText>
          <ContactInfoText>
            Phone:
            <ContactInfos href={`tel:+91${Bio.phone}`}>
              {" "}
              +91 {Bio.phone}
            </ContactInfos>
          </ContactInfoText>
        </ContactInfo>

        <SocialMediaIcons>
          <SocialMediaIcon
            href={Bio.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon />
          </SocialMediaIcon>
          <SocialMediaIcon
            href={Bio.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </SocialMediaIcon>
          <SocialMediaIcon
            href={Bio.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.insta} target="_blank" rel="noreferrer">
            <InstagramIcon />
          </SocialMediaIcon>
        </SocialMediaIcons>

        <Copyright>
          &copy; {currentYear} Abhijit Nanda. All rights reserved.
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
