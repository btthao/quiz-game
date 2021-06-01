import { css } from "styled-components";

export const theme = {
  dark: "#293147",
  primary1: "#46be74",
  primary2: "#dd655f",
  primary3: "#03D3F6",
  light: "#8D91BD",
};

export const breakpoint = {
  mobileS: "(max-width: 320px)",
  mobileL: "(max-width: 425px)",
  tabletS: "(max-width: 815px)",
  tabletL: "(max-width: 1024px)",
  desktop: "(min-width: 500px)",
};

export const neumorphism = css`
  border-radius: 26px;
  background: linear-gradient(145deg, #252c40, #2c344c);
  box-shadow: 3px 3px 20px #10141c, -5px -5px 20px #424e72;
`;
