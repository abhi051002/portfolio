import styled from "styled-components";

/* Modal overlay */
export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: top;
  justify-content: center;
  overflow-y: scroll;
  transition: all 0.5s ease;
`;

/* Modal wrapper */
export const Wrapper = styled.article`
  max-width: 800px;
  width: 100%;
  border-radius: 16px;
  margin: 50px 12px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

/* FIXED: Should be a heading */
export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px 0px 6px;

  @media only screen and (max-width: 600px) {
    font-size: 24px;
    margin: 6px 6px 0px 6px;
  }
`;

/* FIXED: This is metadata → use <time> */
export const Date = styled.time`
  font-size: 16px;
  margin: 2px 6px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Desc = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px;

  @media only screen and (max-width: 600px) {
    font-size: 14px;
    margin: 6px 6px;
  }
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

/* FIXED: Should be a heading inside section */
export const Label = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px;

  @media only screen and (max-width: 600px) {
    font-size: 16px;
    margin: 8px 6px;
  }
`;

/* FIXED: This is a list of tags */
export const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0px;
  padding: 0;
  list-style: none;

  @media only screen and (max-width: 600px) {
    margin: 4px 0px;
  }
`;

export const Tag = styled.li`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  margin: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary + 20};

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

/* FIXED: Members list should be UL */
export const Members = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-wrap: wrap;
  margin: 12px 6px;
  padding: 0;
  list-style: none;

  @media only screen and (max-width: 600px) {
    margin: 4px 6px;
  }
`;

/* FIXED: Member item = <li> */
export const Member = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MemberImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 600px) {
    width: 32px;
    height: 32px;
  }
`;

export const MemberName = styled.p`
  font-size: 16px;
  font-weight: 500;
  width: 200px;
  color: ${({ theme }) => theme.text_primary};

  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px 0px;
  gap: 12px;
`;

export const Button = styled.a`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};

  ${({ dull, theme }) =>
    dull &&
    `
        background-color: ${theme.bgLight};
        color: ${theme.text_secondary};
    `}

  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary + 99};
  }

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

export const NotDeployedNotice = styled.div`
  background-color: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  padding: 16px;
  border-radius: 8px;
  margin: 10px 0;
  font-weight: 500;
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.primary};
`;
