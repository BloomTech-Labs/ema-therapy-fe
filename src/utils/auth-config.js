/* eslint-disable import/no-mutable-exports */

let AUTH0_CLIENT_ID;
let AUTH0_DOMAIN;
let AUTH0_AUDIENCE;

const NODE_ENV = process.env.REACT_APP_FORCE_NODE_ENV || process.env.NODE_ENV;

if (NODE_ENV === 'development') {
  AUTH0_AUDIENCE = 'http://localhost:5000';
  AUTH0_CLIENT_ID = 'oVhKrQPd2E4o0n9mPPtV1rfoKJaiMYNi';
  AUTH0_DOMAIN = 'moodmuse-dev.auth0.com';
} else if (NODE_ENV === 'production') {
  AUTH0_AUDIENCE = 'https://moodmuse.herokuapp.com';
  AUTH0_CLIENT_ID = 'RWYKn1NSBG6LjReho2WItTjxxdtBxjXj';
  AUTH0_DOMAIN = 'moodmuse.auth0.com';
} else if (NODE_ENV === 'staging') {
  AUTH0_AUDIENCE = 'https://moodmuse-staging.herokuapp.com';
  AUTH0_CLIENT_ID = 'KwOV32dmJl1hXtMWAkaf8AgV4NNjYdPW';
  AUTH0_DOMAIN = 'moodmuse-staging.auth0.com';
}

export { AUTH0_CLIENT_ID, AUTH0_AUDIENCE, AUTH0_DOMAIN };
