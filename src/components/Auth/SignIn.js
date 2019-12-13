import React, { useState } from 'react';
import { Button, Input, Form, Icon } from 'antd';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';
import StyledSignIn from './auth.styles';
import splash from '../../assets/splash-image.png';
import google from '../../assets/google.png';

import { userLogin } from './axiosAuth/axios';

const inputStyles = {
  fontSize: '16px',
  lineHeight: 1.5,
};

const SignIn = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const saveUserAndRedirect = (returnedUser) => {
    setUser(returnedUser);
    setIsAuthenticated(true);
    history.push('/dashboard');
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(credentials, saveUserAndRedirect);
  };

  return (
    <StyledSignIn>
      <div style={{ marginBottom: '-1px' }}>
        <h2 style={{ position: 'absolute' }}>
          Welcome
          <br />
          Back
        </h2>
        <img src={splash} alt="leaves" style={{ width: '100%' }} />
      </div>
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
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Input.Password
            style={inputStyles}
            placeholder="Password"
            size="large"
            name="password"
            value={credentials.password}
            type="password"
            onChange={handleChange}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <Button className="btn login" htmlType="submit">
            Log In
          </Button>
          <p className="divide">or</p>
          <Button
            className="btn google"
            onClick={() => console.log('login w goog goes here')}
          >
            <img
              src={google}
              alt="google"
              style={{ height: 32, marginRight: 24 }}
            />
            Sign in with Google
          </Button>
        </Form>
        <div className="account">
          <p>Don&apos;t have an account?</p> <Link to="/signup">Sign Up</Link>
        </div>
      </div>

      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledSignIn>
  );
};

export default SignIn;
