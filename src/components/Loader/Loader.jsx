import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || "40px"};
  min-height: ${props => props.minHeight || "200px"};
`;

const Spinner = styled(motion.div)`
  width: ${props => props.size || "50px"};
  height: ${props => props.size || "50px"};
  border: 4px solid rgba(133, 76, 230, 0.1);
  border-top-color: #854CE6;
  border-radius: 50%;
`;

const LoadingText = styled(motion.p)`
  margin-top: 20px;
  font-size: ${props => props.fontSize || "16px"};
  color: ${props => props.color || "rgba(255, 255, 255, 0.7)"};
  font-weight: 500;
`;

const Loader = ({ 
  text = "Loading...", 
  size = "50px", 
  textColor,
  fontSize,
  padding,
  minHeight,
  showText = true 
}) => {
  return (
    <LoaderContainer padding={padding} minHeight={minHeight}>
      <Spinner
        size={size}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {showText && (
        <LoadingText
          color={textColor}
          fontSize={fontSize}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </LoadingText>
      )}
    </LoaderContainer>
  );
};

export default Loader;