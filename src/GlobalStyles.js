import { createGlobalStyle } from "styled-components";

//GLOBAL STLYES AND THEMES
const GlobalStyle = createGlobalStyle`
    *{margin: 0}
    body{font-family: Nunito}
`;

export const DarkTheme = {
  body: "#0a012e",
  fontColor: "#fff",
  primary: "linear-gradient(to right, rgb(237, 33, 58), rgb(147, 41, 30))",
};

export const LightTheme = {
  body: "#f2f0fa",
  fontColor: "#000",
  primary: "linear-gradient(to right, rgb(0, 180, 219), rgb(0, 131, 176))",
};

export default GlobalStyle;
