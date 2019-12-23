import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './containers/App';
import 'sanitize.css/sanitize.css';
import { AuthProvider } from './utils/dataStore';
import { GA_ID } from './utils/config';
import theme from './styles/theme';
import * as serviceWorker from './utils/serviceWorker';
import GAListener from './components/GAListener';

// replace Router with DebugRouter if you need to debug routes

// class DebugRouter extends Router {
//   constructor(props) {
//     super(props);
//     console.log('initial history is: ', JSON.stringify(this.history, null, 2));
//     this.history.listen((location, action) => {
//       console.log(
//         `The current URL is ${location.pathname}${location.search}${location.hash}`,
//       );
//       console.log(
//         `The last navigation action was ${action}`,
//         JSON.stringify(this.history, null, 2),
//       );
//     });
//   }
// }

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <AuthProvider>
        <GAListener trackingId={GA_ID}>
          <App />
        </GAListener>
      </AuthProvider>
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
