import { FloatingElement, HeroRightContainer, ImageContainer, ImageWrapper, ProfileImage } from "./HeroSectionStyle";
import HeroImage from '../../Image/HeroImage.jpeg';
import { Bio } from "../../data/constants";

export const MobileImageSection = ({ imageVariants }) => {
    return (
        <HeroRightContainer
            className="mobile-image"
            initial="hidden"
            animate="visible"
        >
            <ImageContainer variants={imageVariants}>
                {/* <RotatingRing /> */}
                {/* <RotatingRing /> */}

                <ImageWrapper
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <ProfileImage
                        src={HeroImage}
                        alt={Bio.name}
                    />
                </ImageWrapper>
            </ImageContainer>
        </HeroRightContainer>
    );
};