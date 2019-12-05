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

  .ant-slider-track, .ant-slider-rail {
    height: 6px !important;
  }

  .ant-slider-handle {
    height: 16px !important;
    width: 16px !important;
  }
`;

export default GlobalStyle;
