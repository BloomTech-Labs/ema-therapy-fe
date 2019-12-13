import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './containers/App';
import 'sanitize.css/sanitize.css';
import { AuthProvider } from './utils/dataStore';
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_AUDIENCE,
  GA_ID,
} from './utils/config';
import theme from './styles/theme';
import * as serviceWorker from './utils/serviceWorker';
import GAListener from './components/GAListener';

// A function that routes the user to the right place after login
// const onRedirectCallback = (appState) => {
//   window.history.replaceState(
//     {},
//     document.title,
//     appState && appState.targetUrl
//       ? appState.targetUrl
//       : window.location.pathname,
//   );
// };

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AuthProvider
    // domain={AUTH0_DOMAIN}
    //   client_id={AUTH0_CLIENT_ID}
    //   redirect_uri={window.location.origin}
    //   audience={AUTH0_AUDIENCE}
    //   onRedirectCallback={onRedirectCallback}
    >
      <Router>
        <GAListener trackingId={GA_ID}>
          <App />
        </GAListener>
      </Router>
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
