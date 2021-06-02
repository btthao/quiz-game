import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, breakpoint } from "../styles";
import axios from "axios";
import Option from "./Option";
import Button from "./Button";
import ClipLoader from "react-spinners/ClipLoader";
import { shuffle } from "../utils";

interface Props {
  topic: number | null;
  difficultyLevel: string;
  restart: () => void;
}

interface Data {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface Question {
  question: string;
  correct_answer: string;
  answers: string[];
}

const Game__container = styled.div`
  width: 100%;
  padding: 1rem 0;
  .score {
    font-size: 1.4rem;
    margin: 0.4rem auto;
    span {
      color: ${theme.primary3};
    }
  }

  .question {
    font-size: 1.3rem;
    margin: 0.8rem auto;
    border: 0.1rem solid ${theme.light};
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    color: ${theme.primary3};
    p:nth-of-type(2) {
      font-size: 1rem;
      margin-top: 0.4rem;
      color: ${theme.light};
    }
  }

  .timer {
    color: ${theme.primary3};
    font-size: 1.1rem;
    margin: 1rem auto;
  }

  .gameOver {
    text-transform: uppercase;
    color: ${theme.primary3};
    font-weight: 700;
    font-size: 1.5rem;
  }
`;

const Game__answers = styled.div`
  padding: 1rem 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  margin-bottom: 1.2rem;
  @media ${breakpoint.mobileL} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;

const Loader = styled.div`
  margin: 4rem auto;
`;

const Game: React.FC<Props> = ({ topic, difficultyLevel, restart }: Props) => {
  const totalQuestions = 10;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(90);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const checkAnswer = (answer: string) => {
    if (userAnswers.length < index + 1 && !gameOver) {
      setUserAnswers([...userAnswers, answer]);
      if (answer === questions[index].correct_answer) {
        setScore(score + 1);
      }
    }
  };

  useEffect(() => {
    if (topic && difficultyLevel) {
      const api = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${topic}&difficulty=${difficultyLevel}&type=multiple`;
      axios
        .get(api)
        .then((res) => {
          const data = res.data.results;
          setQuestions(
            data?.map((item: Data) => {
              const { question, correct_answer, incorrect_answers } = item;
              return {
                question,
                correct_answer,
                answers: shuffle([...incorrect_answers, correct_answer]),
              };
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [topic, difficultyLevel]);

  useEffect(() => {
    if (questions.length > 0) {
      setLoading(false);
    }
  }, [questions]);

  useEffect(() => {
    if (userAnswers.length == totalQuestions || timer == 0) {
      setGameOver(true);
      return;
    }

    const time = setInterval(() => setTimer(timer - 1), 1000);

    return () => {
      clearInterval(time);
    };
  }, [timer]);

  return (
    <Game__container>
      {loading && (
        <Loader>
          <ClipLoader color={theme.primary3} size={200} />
        </Loader>
      )}
      {!loading && (
        <>
          <p className="score">
            Score: <span>{score}</span>
          </p>
          <p className="timer">Time left: {timer}</p>
          {(userAnswers.length == totalQuestions || timer == 0) && (
            <p className="gameOver">Game Over</p>
          )}
          <div className="question">
            <p>Question: {index + 1}</p>
            <p
              dangerouslySetInnerHTML={{ __html: questions[index]?.question }}
            />
          </div>
          <Game__answers>
            {questions[index]?.answers.map((answer) => (
              <Option
                key={answer}
                content={answer}
                isDisabled={userAnswers.length == index + 1 || gameOver}
                clickedOn={answer == userAnswers[index]}
                correct={answer === questions[index].correct_answer}
                onClick={() => checkAnswer(answer)}
              />
            ))}
          </Game__answers>
          {userAnswers.length == index + 1 &&
            index !== totalQuestions - 1 &&
            !gameOver && (
              <button className="btn" onClick={() => setIndex(index + 1)}>
                Next Question
              </button>
            )}
          {gameOver && <Button text="Start new game" onClick={restart} />}
        </>
      )}
    </Game__container>
  );
};

export default Game;
