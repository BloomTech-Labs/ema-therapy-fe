import axios from 'axios';
import { AXIOS_URI } from '../../../utils/config';

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// login existing user
export const userLogin = (credentials, cbOnSuccess, cbOnError) => {
  axios
    .post(`${AXIOS_URI}/auth/login`, credentials)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      const user = parseJwt(res.data.token);
      cbOnSuccess(user);
    })
    .catch((err) => cbOnError(err.message));
};

// signup new user
export const postUser = (credentials, cbOnSuccess, cbOnError) => {
  axios
    .post(`${AXIOS_URI}/auth/register`, credentials)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      const user = parseJwt(res.data.token);
      cbOnSuccess(user);
    })
    .catch((err) => cbOnError(err.message));
};

// use google auth
export const postGoogleUser = () => {
  axios
    .post(`${AXIOS_URI}/auth/google`)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
    })
    .catch((err) => {
      console.log(`unable to register user through Google: ${err}`);
    });
};
