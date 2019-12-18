import React, { useState } from 'react';
import { Button, Input, Form, Icon, Alert } from 'antd';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';
import StyledSignIn from './auth.styles';
import splash from '../../assets/splash-image.png';
import googleLogo from '../../assets/google.png';
import { userLogin } from './axiosAuth/axios';
import { GOOGLE_BUTTON_REDIRECT } from '../../utils/config';

const inputStyles = {
  fontSize: '16px',
  lineHeight: 1.5,
};

const SignIn = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err);
    setLoading(false);
  };

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
    setError(null);
    setLoading(true);
    userLogin(credentials, saveUserAndRedirect, handleError);
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
          <Button loading={loading} className="btn login" htmlType="submit">
            Log In
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
          <p>Don&apos;t have an account?</p> <Link to="/signup">Sign Up</Link>
        </div>
      </div>

      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledSignIn>
  );
};

export default SignIn;
