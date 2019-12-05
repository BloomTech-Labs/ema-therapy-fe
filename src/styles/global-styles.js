import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
  }
`;

export default GlobalStyle;
