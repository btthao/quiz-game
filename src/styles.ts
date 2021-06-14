import { css } from "styled-components";

export const theme = {
  dark: "#171c27",
  primary1: "#46be74",
  primary2: "#dd655f",
  primary3: "#10eebe",
  primary4: "#d9b08c",
  light: "#d1e8e2",
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
  background: #171c27;
  box-shadow: 5px 5px 21px #0c0f14, -5px -5px 21px #22293a;
`;
