import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import 'sanitize.css/sanitize.css';
// import * as serviceWorker from './utils/serviceWorker';

//  https://s3.amazonaws.com/apollo-docs-1.x/redux.html
// docs for adding apollo to redux

ReactDOM.render(

  <App />,

  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
