import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    /* font-family: 'Fira Sans', sans-serif !important; */
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
`;

export default GlobalStyle;
