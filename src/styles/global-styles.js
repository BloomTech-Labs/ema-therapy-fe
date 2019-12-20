import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  #root, .App {
    height: 100%;
  }

  #root {
    display: flex;
    justify-content: center;
  }

  .App {
    width: 100%;
    max-width: 500px;
    position: relative;
  }

  :root {
    --wheel-slice-spacing: 10px;
    --nb-item: 0;
    --item-nb: 0;
    --selected-item: 0;
    --nb-turn: 5;
    --spinning-duration: 4s;
    --reset-duration: 0.25s;
  }
`;

export default GlobalStyle;
