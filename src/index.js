import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './containers/App';
import 'sanitize.css/sanitize.css';
import { GA_ID } from './utils/config';
import theme from './styles/theme';
import * as serviceWorker from './utils/serviceWorker';
import GAListener from './components/GAListener';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <GAListener trackingId={GA_ID}>
        <App />
      </GAListener>
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
