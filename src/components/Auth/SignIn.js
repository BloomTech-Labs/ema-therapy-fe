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
      <h2>Welcome Back</h2>
      <div className="form-wrapper">
        <div className="login-form">
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
