import React from "react";
import styled from "styled-components";
import { theme, breakpoint, neumorphism } from "../styles";

interface Props {
  text: string;
  onClick: () => void;
}

const Button__container = styled.button`
  cursor: pointer;
  border: 0.1rem solid ${theme.primary3};
  padding: 0.5rem 1.2rem;
  color: ${theme.light};
  font-size: 1.3rem;
  ${neumorphism}
  @media ${breakpoint.desktop} {
    &:hover {
      color: ${theme.primary3};
    }
  }
`;

const Button: React.FC<Props> = ({ text, onClick }: Props) => {
  return <Button__container onClick={onClick}>{text}</Button__container>;
};

export default Button;
