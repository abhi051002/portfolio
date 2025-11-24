import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledButton = styled.button`
    display: none;
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text_black};
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.8s ease-in-out;
`;
// Then apply motion
export const Button = motion.create(StyledButton);

export const StyledCard = styled.div`
  position: relative;
  width: 330px;
  /* height: 460px;  ❌ remove this */
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
  overflow: hidden;
  padding: 26px 20px 18px; /* reduced bottom padding */
  display: flex;
  flex-direction: column;
  gap: 14px;

  &:hover ${StyledButton} {
    display: block;
  }
`;


export const Card = motion.create(StyledCard);

export const StyledImage = styled.img`
    width: 100%;
    height: 180px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
`;
export const Image = motion.create(StyledImage);

export const StyledTags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`;
export const Tags = motion.create(StyledTags);

export const StyledTag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 2px 8px;
    border-radius: 10px;
`;
export const Tag = motion.create(StyledTag);

export const StyledDetails = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`;
export const Details = motion.create(StyledDetails);

export const StyledTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const Title = motion.create(StyledTitle);

export const StyledDate = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};       /* Highlighted color */

  @media only screen and (max-width: 768px){
    font-size: 10px;
  }
`;

export const Date = motion.create(StyledDate);

export const StyledDescription = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    overflow: hidden;
    margin-top: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;
export const Description = motion.create(StyledDescription);

export const StyledMembers = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
`;
export const Members = motion.create(StyledMembers);

export const StyledAvatar = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-left: -10px;
    background-color: ${({ theme }) => theme.white};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: 3px solid ${({ theme }) => theme.card}
`;
export const Avatar = motion.create(StyledAvatar);

export const StyledWorkingBookmark = styled.div`
    position: absolute;
    top: 30px;
    right: -30px;
    background-color: ${({ theme }) => theme.primary || "#eab308"};
    color: white;
    padding: 5px 30px;
    font-weight: 600;
    font-size: 14px;
    transform: rotate(45deg);
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    @media only screen and (max-width: 2000px) {
        right: -10px;
    }
`;
export const WorkingBookmark = motion.create(StyledWorkingBookmark);

export const ReadButton = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px; 
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  padding: 12px 16px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  cursor: pointer;
  text-decoration: none;

  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary + "cc"};
    color: ${({ theme }) => theme.white};
  }

  ${({ dull, theme }) =>
    dull &&
    `
      background-color: ${theme.bgLight};
      color: ${theme.text_secondary};

      &:hover {
        background-color: ${theme.bg + "99"};
        color: ${theme.text_primary};
      }
    `}

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
