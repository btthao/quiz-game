import React from "react";
import styled from "styled-components";
import { theme, neumorphism } from "../styles";
interface Props {
  content: string;
  onClick: () => void;
  correct: boolean;
  userAnswered: boolean;
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
  &:disabled {
    color: gray;
    cursor: auto;
    border: ${({ correct, clicked }) =>
      correct
        ? `0.1rem solid ${theme.primary1}`
        : clicked && !correct
        ? `0.1rem solid ${theme.primary2}`
        : "0.1rem solid gray"};
  }
`;

const Option: React.FC<Props> = ({
  content,
  correct,
  onClick,
  userAnswered,
  clickedOn,
}: Props) => {
  return (
    <Option__container
      correct={correct}
      onClick={onClick}
      disabled={userAnswered}
      clicked={clickedOn}
    >
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Option__container>
  );
};

export default Option;
