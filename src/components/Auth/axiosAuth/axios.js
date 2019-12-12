import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AXIOS_URI } from '../../../utils/config';

// login existing user
export const userLogin = (credentials, cbOnSuccess) => {
  axios
    .post(`${AXIOS_URI}/auth/login`, credentials)
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.token);
      cbOnSuccess();
    })
    .catch((err) => {
      console.log(`unable to login user: ${err}`);
    });
};

// signup new user
export const postUser = (credentials, cbOnSuccess) => {
  axios
    .post(`${AXIOS_URI}/auth/register`, credentials)
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.token);
      cbOnSuccess();
    })
    .catch((err) => {
      console.log(`unable to register user: ${err}`);
    });
};

// use google auth
export const postGoogleUser = () => {
  axios
    .post(`${AXIOS_URI}/auth/google`)
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.token);
    })
    .catch((err) => {
      console.log(`unable to register user through Google: ${err}`);
    });
};
