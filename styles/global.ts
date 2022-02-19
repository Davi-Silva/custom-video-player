import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', 'Lato';
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    /* transition: background .2s ease-in-out, color .2s ease-in-out, border .2s ease-in-out, border-color .2s ease-in-out; */
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  html {
    overflow-y: overlay;
    overflow-x: hidden;
  }
`;
