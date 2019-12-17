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
    ${'' /* --wheel-size: 400px; */}
    --wheel-size: 300px;
    --wheel-slice-spacing: 10px;
    --wheel-border-size: 5px;
    --wheel-color: #0C423B;
    --neutral-color: white;
    --PI: 3.14159265358979;
    --nb-item: 0;
    --item-nb: 0;
    --selected-item: 0;
    --nb-turn: 5;
    --spinning-duration: 4s;
    --reset-duration: 0.25s;
  }
`;

export default GlobalStyle;
