import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
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
import { usePortfolio } from "../../context/PortfolioContext";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { bioData } = usePortfolio();

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
            <ContactInfos href={`mailto:${bioData.email}`}>
              {bioData.email}
            </ContactInfos>
          </ContactInfoText>
          <ContactInfoText>
            Phone:
            <ContactInfos href={`tel:+91${bioData.phone}`}>
              {" "}
              +91 {bioData.phone}
            </ContactInfos>
          </ContactInfoText>
        </ContactInfo>

        <SocialMediaIcons>
          <SocialMediaIcon
            href={bioData.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon />
          </SocialMediaIcon>
          <SocialMediaIcon
            href={bioData.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </SocialMediaIcon>
          <SocialMediaIcon
            href={bioData.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </SocialMediaIcon>
          <SocialMediaIcon
            href={bioData.insta}
            target="_blank"
            rel="noreferrer"
          >
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
