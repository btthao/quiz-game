import React from "react";
import styled from "styled-components";
import { theme, breakpoint, neumorphism } from "../styles";

interface Props {
  text: string;
  current: boolean;
  onClick: () => void;
}

interface CardProps {
  current: boolean;
}

const Card__container = styled.button<CardProps>`
  cursor: pointer;
  color: ${({ current }) => (current ? theme.dark : theme.light)};
  padding: 1rem 1.3rem;
  font-size: 1.2rem;
  text-transform: capitalize;
  border: 0.1rem solid ${theme.primary3};
  ${neumorphism}
  background: ${({ current }) => current && theme.primary3};
  @media ${breakpoint.mobileL} {
    padding: 0.7rem;
  }
  @media ${breakpoint.desktop} {
    &:hover {
      background: ${theme.primary3};
      color: ${theme.dark};
    }
  }
`;

const Card: React.FC<Props> = ({ text, onClick, current }: Props) => {
  return (
    <Card__container current={current} onClick={onClick}>
      {text}
    </Card__container>
  );
};

export default Card;
