import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Bio } from '../../data/constants';
import { FooterContainer, FooterWrapper, Logo, Nav, NavLink, ContactInfo, ContactInfos, SocialMediaIcon, SocialMediaIcons, Copyright, ContactInfoText } from './FooterStyle';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Abhijit Nanda</Logo>
        <Nav>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Nav>
        <ContactInfo>
          <ContactInfoText>Emails:<ContactInfos href="mailto:abhijitnanda8249@gmail.com">abhijitnanda8249@gmail.com</ContactInfos></ContactInfoText>
          <ContactInfoText>Number:<ContactInfos href="tel:+918249001710"> +91 8249001710</ContactInfos></ContactInfoText>
        </ContactInfo>
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.facebook} target="display"><FacebookIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.twitter} target="display"><TwitterIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.linkedin} target="display"><LinkedInIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.insta} target="display"><InstagramIcon /></SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>
          &copy; {currentYear} Abhijit Nanda. All rights reserved.
        </Copyright>

      </FooterWrapper>
    </FooterContainer >
  );
}

export default Footer;