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
    width: 500px;
    max-width: 100%;
  }
`;

export default GlobalStyle;
