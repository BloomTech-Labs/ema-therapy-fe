import axios from 'axios';
import { AXIOS_URI } from '../../../utils/config';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// login existing user
export const userLogin = (credentials, cbOnSuccess) => {
  axios
    .post(`${AXIOS_URI}/auth/login`, credentials)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      const user = parseJwt(res.data.token);
      cbOnSuccess(user);
    })
    .catch((err) => {
      // TODO handle error
      console.log(`unable to login user: ${err}`);
    });
};

// signup new user
export const postUser = (credentials, cbOnSuccess) => {
  axios
    .post(`${AXIOS_URI}/auth/register`, credentials)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      const user = parseJwt(res.data.token);
      cbOnSuccess(user);
    })
    .catch((err) => {
      // TODO handle error
      console.log(`unable to register user: ${err}`);
    });
};
