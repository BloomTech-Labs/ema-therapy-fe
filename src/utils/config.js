/* eslint-disable import/no-mutable-exports */

let GOOGLE_BUTTON_REDIRECT;
let GRAPHQL_URI;
let GA_ID;
let AXIOS_URI;

const NODE_ENV = process.env.REACT_APP_FORCE_NODE_ENV || process.env.NODE_ENV;

if (NODE_ENV === 'development') {
  GOOGLE_BUTTON_REDIRECT = 'http://localhost:5000/auth/google';
  GRAPHQL_URI = 'http://localhost:5000/backend';
  AXIOS_URI = 'http://localhost:5000';
  GA_ID = '';
} else if (NODE_ENV === 'production') {
  GOOGLE_BUTTON_REDIRECT =
    'https://moodmuse-production.herokuapp.com/auth/google';
  GRAPHQL_URI = 'https://moodmuse-production.herokuapp.com/backend';
  AXIOS_URI = 'https://moodmuse-production.herokuapp.com';
  GA_ID = 'UA-153720943-1';
} else if (NODE_ENV === 'staging') {
  GOOGLE_BUTTON_REDIRECT = 'https://moodmuse.herokuapp.com/auth/google';
  GRAPHQL_URI = 'https://moodmuse.herokuapp.com/backend';
  AXIOS_URI = 'https://moodmuse.herokuapp.com';
  GA_ID = 'UA-153522827-1';
}

export { GOOGLE_BUTTON_REDIRECT, GRAPHQL_URI, AXIOS_URI, GA_ID };
