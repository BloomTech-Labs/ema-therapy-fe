import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import StyledSignIn from './auth.styles';
import splash from '../../assets/splash-image.png';
import google from '../../assets/google.png';

const inputStyles = {
  height: '50px',
  fontSize: '16px',
  lineHeight: 1.5,
  padding: '13px 12px',
  marginBottom: '15px',
};

const SignIn = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <StyledSignIn>
      <div style={{ marginBottom: '-1px' }}>
        <h2 style={{ position: 'absolute' }}>
          Create
          <br />
          Account
        </h2>
        <img src={splash} alt="leaves" style={{ width: '100%' }} />
      </div>

      <div className="form-wrapper">
        <Form onSubmit={handleSubmit}>
          <Input
            style={inputStyles}
            placeholder="Name"
            type="text"
            size="large"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <Input
            style={inputStyles}
            placeholder="Email"
            type="text"
            size="large"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Input
            style={{ ...inputStyles, marginBottom: 28 }}
            placeholder="Password"
            type="password"
            size="large"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button className="btn signup" htmlType="submit">
            Sign Up
          </Button>
        </Form>
        <div className="account">
          <p>Already have an account?</p> <Link to="/signin">Sign In</Link>
        </div>
      </div>

      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledSignIn>
  );
};

export default SignIn;
