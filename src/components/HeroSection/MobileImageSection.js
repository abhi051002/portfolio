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

                {/* Floating elements around image */}
                {[...Array(6)].map((_, i) => (
                    <FloatingElement
                        key={i}
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                        style={{
                            top: `${20 + Math.sin(i * Math.PI / 3) * 30}%`,
                            left: `${50 + Math.cos(i * Math.PI / 3) * 40}%`,
                        }}
                    />
                ))}
            </ImageContainer>
        </HeroRightContainer>
    );
};