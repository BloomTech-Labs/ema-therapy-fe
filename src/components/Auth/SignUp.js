import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';
import StyledSignIn from './auth.styles';

import { postUser } from './axiosAuth/axios';

const inputStyles = {
  height: '50px',
  fontSize: '16px',
  lineHeight: 1.5,
  padding: '13px 12px',
  marginBottom: '15px',
};

const SignIn = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const saveUserAndRedirect = (returnedUser) => {
    setUser(returnedUser);
    setIsAuthenticated(true);
    history.push('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(credentials, saveUserAndRedirect);
  };

  return (
    <StyledSignIn>
      <h2>
        Create
        <br />
        Account
      </h2>
      <div style={{ overflow: 'hidden' }}>
        <svg
          width="110%"
          height="75"
          viewBox="0 0 517 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: '-1.1em', marginLeft: '-2.3em' }}
        >
          <path
            d="M516 50.2188V73.8681H1V55.8199C178.176 -32.0334 300.416 0.657511 516 50.2188Z"
            fill="white"
            stroke="white"
          />
        </svg>
        <div className="form-wrapper">
          <Form onSubmit={handleSubmit}>
            <Input
              style={inputStyles}
              placeholder="Name"
              type="text"
              size="large"
              name="firstName"
              value={credentials.firstName}
              onChange={handleChange}
            />
            <Input
              style={inputStyles}
              placeholder="Email"
              type="text"
              size="large"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
            <Input
              style={{ ...inputStyles, marginBottom: 0 }}
              placeholder="Password"
              type="password"
              size="large"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <p>Forgot Password?</p>
            <Button className="btn login" htmlType="submit">
              Sign Up
            </Button>
            <Button className="btn" onClick={() => history.push('/signin')}>
              Log In
            </Button>
          </Form>
        </div>
      </div>
      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledSignIn>
  );
};

export default SignIn;
