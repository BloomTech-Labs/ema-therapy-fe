import React, { useState } from 'react';
import { Button, Input, Form, Icon } from 'antd';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import StyledSignIn from './auth.styles';
import splash from '../../assets/splash-image.png';

const inputStyles = {
  fontSize: '16px',
  lineHeight: 1.5,
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
          <p>Forgot Password?</p>
          <Button className="btn login" htmlType="submit">
            Log In
          </Button>
          <Button className="btn" onClick={() => history.push('/signup')}>
            Sign Up
          </Button>
        </Form>
      </div>

      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledSignIn>
  );
};

export default SignIn;
