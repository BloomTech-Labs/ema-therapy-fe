import React, { useState } from 'react';
import { Button, Input, Form, Icon, Alert } from 'antd';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';
import StyledSignIn from './auth.styles';
import splash from '../../assets/splash-image.png';
import { postUser } from './axiosAuth/axios';
import googleLogo from '../../assets/google.png';
import { GOOGLE_BUTTON_REDIRECT } from '../../utils/config';

const inputStyles = {
  fontSize: '16px',
  lineHeight: 1.5,
  marginBottom: '15px',
};

const SignUp = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleError = (err) => {
    setError(err);
    setLoading(false);
  };

  if (error) console.log(error);

  const saveUserAndRedirect = (returnedUser) => {
    setUser(returnedUser);
    setIsAuthenticated(true);
    history.push('/entryform');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    postUser(credentials, saveUserAndRedirect, handleError);
  };

  return (
    <StyledSignIn>
      {error && (
        <Alert
          style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          message={error}
          type="error"
          banner
          closable
        />
      )}
      <div style={{ marginBottom: '-1px' }}>
        <h2 style={{ position: 'absolute' }}>
          Create
          <br />
          Account
        </h2>
        <img
          src={splash}
          alt="leaves"
          style={{ width: '100%', marginTop: -40 }}
        />
      </div>

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
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Input.Password
            style={{ ...inputStyles, marginBottom: 28 }}
            placeholder="Password"
            type="password"
            size="large"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Button loading={loading} className="btn signup" htmlType="submit">
            Sign Up
          </Button>
          <p className="or">or</p>
          <Button className="btn google" href={GOOGLE_BUTTON_REDIRECT}>
            <img
              src={googleLogo}
              alt="Google logo"
              style={{ height: 24, marginRight: 18 }}
            />
            Sign in with Google
          </Button>
        </Form>
        <div className="account">
          <p>Already have an account?</p>
          <Link to="/signin">Sign In</Link>
        </div>
      </div>

      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledSignIn>
  );
};

export default SignUp;
