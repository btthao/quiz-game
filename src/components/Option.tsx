import React from "react";
import styled, { keyframes } from "styled-components";
import { theme, breakpoint, neumorphism } from "../styles";

const appear = keyframes`
  from { 
  transform: translateY(100%);
  opacity: 0;
  }
  to { 
  transform: translateY(0%);
  opacity: 1;
  }
`;

interface Props {
  content: string;
  onClick: () => void;
  correct: boolean;
  isDisabled: boolean;
  clickedOn: boolean;
}

interface OptionProps {
  correct: boolean;
  clicked: boolean;
}

const Option__container = styled.button<OptionProps>`
  color: ${theme.light};
  padding: 1rem 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  ${neumorphism}
  border: 0.1rem solid ${theme.light};
  animation: 0.3s ${appear} ease-out;
  &:disabled {
    color: gray;
    cursor: auto;
    pointer-events: none;
    border: ${({ correct, clicked }) =>
      correct
        ? `0.1rem solid ${theme.primary1}`
        : clicked && !correct
        ? `0.1rem solid ${theme.primary2}`
        : "0.1rem solid gray"};
  }
  @media ${breakpoint.desktop} {
    &:hover {
      background: ${theme.primary3};
      color: ${theme.dark};
    }
  }
`;

const Option: React.FC<Props> = ({
  content,
  correct,
  onClick,
  isDisabled,
  clickedOn,
}: Props) => {
  return (
    <Option__container
      correct={correct}
      onClick={onClick}
      disabled={isDisabled}
      clicked={clickedOn}
    >
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Option__container>
  );
};

export default Option;
