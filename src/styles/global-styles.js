import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
    line-height: 1.4;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
  }

  #root, .App {

    height: 100%;
  }

  #root {
    display: flex;
    justify-content: center;
  }

  .App {
    max-width: 500px;
  }

  button {
    cursor: pointer
  }
`;

export default GlobalStyle;
