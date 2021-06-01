import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { theme, breakpoint } from "./styles";
import { topics, difficulty } from "./data";
import Card from "./components/Card";
import Game from "./components/Game";
import Button from "./components/Button";

const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
}

body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    background: ${theme.dark};
    color: ${theme.light};
    padding-top: 2rem;
}

  .btn {
    cursor: pointer;
    padding: 0.3rem 1.1rem;
    font-size: 1rem;
    background: ${theme.primary3};
    border-radius: 0.5rem;
    font-weight: 600;
    color: ${theme.dark};
    margin: 1rem auto 2rem;
    @media ${breakpoint.desktop} {
      &:hover {
        filter: brightness(1.2);
      }
    }
  }

`;

const AppWrapper = styled.div`
  margin: auto;
  width: 100%;
  min-width: 280px;
  max-width: 700px;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 0.5rem;
  > h1 {
    font-size: 4rem;
    color: ${theme.primary3};
    @media ${breakpoint.mobileL} {
      font-size: 2.8rem;
    }
  }
  > h3 {
    font-size: 1.4rem;
    margin: 0.5rem auto;
    text-decoration: underline;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  padding: 1.5rem 1rem;
  @media ${breakpoint.mobileL} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }
`;

function App(): JSX.Element {
  const [topic, setTopic] = useState<number | null>(null);
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const [startGame, setStartGame] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Next");

  const startAgain = () => {
    setStartGame(false);
    setTopic(null);
    setDifficultyLevel("");
    setButtonText("Next");
  };

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <h1>Quiz Game</h1>
        {/* pick topic before game starts */}
        {!startGame && (
          <>
            <h3>
              {buttonText === "Back"
                ? "Choose difficulty level"
                : "Choose a topic"}
            </h3>
            {buttonText === "Back" ? (
              <CardWrapper>
                {difficulty.map((difficulty, index) => (
                  <Card
                    key={index}
                    text={difficulty}
                    current={difficultyLevel == difficulty}
                    onClick={() => setDifficultyLevel(difficulty)}
                  />
                ))}
              </CardWrapper>
            ) : (
              <CardWrapper>
                {topics.map((item) => (
                  <Card
                    key={item.id}
                    text={item.name}
                    current={topic == item.id}
                    onClick={() => setTopic(item.id)}
                  />
                ))}
              </CardWrapper>
            )}
            {topic && (
              <button
                onClick={() =>
                  setButtonText((prev) => (prev === "Next" ? "Back" : "Next"))
                }
                className="btn"
              >
                {buttonText}
              </button>
            )}
            {topic && difficultyLevel && (
              <Button text="Start Game" onClick={() => setStartGame(true)} />
            )}
          </>
        )}
        {startGame && (
          <Game
            topic={topic}
            difficultyLevel={difficultyLevel}
            restart={startAgain}
          />
        )}
      </AppWrapper>
    </>
  );
}

export default App;
