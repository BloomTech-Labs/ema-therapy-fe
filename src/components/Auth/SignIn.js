import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import StyledSignIn from './auth.styles';

const inputStyles = {
  height: '50px',
  fontSize: '16px',
  lineHeight: 1.5,
  padding: '13px 12px',
};

const SignIn = () => {
  const { isAuthenticated } = useAuth0();
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };

  return (
    <StyledSignIn>
      <h2>
        Welcome
        <br />
        Back
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
              style={{ ...inputStyles, marginBottom: '15px' }}
              placeholder="Email"
              size="large"
              name="email"
              value={credentials.email}
              type="text"
              onChange={handleChange}
            />
            <Input
              style={inputStyles}
              placeholder="Password"
              size="large"
              name="password"
              value={credentials.password}
              type="password"
              onChange={handleChange}
            />
            <p>Forgot Password?</p>
            <Button className="btn login" htmlType="submit">
              Log In
            </Button>
            <Button className="btn" onClick={() => history.push('/signup')}>
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledSignIn>
  );
};

export default SignIn;
