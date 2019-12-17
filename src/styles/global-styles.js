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
`;

export default GlobalStyle;
