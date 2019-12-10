import React from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import Login from './Login';
import splash from '../assets/splash-leaves.png';
import styles from '../styles/theme';

const inputStyles = {
  height: '50px',
  fontSize: '16px',
  lineHeight: 1.5,
  padding: '13px 12px',
};

const SignIn = () => {
  return (
    <StyledSignIn>
      <h2>
        Welcome <br /> Back
      </h2>
      <div className="form-wrapper">
        <div className="login-form">
          <form>
            <Input
              style={{ ...inputStyles, marginBottom: '15px' }}
              placeholder="Email"
              size="large"
            />
            <Input style={inputStyles} placeholder="Password" size="large" />
            <p>Forgot Password?</p>
          </form>
        </div>
        <Button className="btn login">Log In</Button>
        <Button className="btn">Sign Up</Button>
      </div>
    </StyledSignIn>
  );
};

const StyledSignIn = styled.div`
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  /* padding: 30px 20px 60px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${styles.darkJungleGreen};
  background: url(${splash}) no-repeat;
  background-position: top -430px left -310px;
  background-size: 185%;
  color: white;

  .form-wrapper {
    background: white;
    padding: 43px 17px;
  }

  h2 {
    color: white;
    font-weight: 600;
    font-size: 28px;
    padding-left: 7px;
    margin-top: 100px;
    margin-left: 45px;
    line-height: 1.2;
  }

  p {
    color: ${styles.tealGreen};
    text-align: right;
    font-size: 12px;
    line-height: 1.5;
    margin-top: 5px;
  }

  .btn {
    height: 48px;
    width: 100%;
    margin-bottom: 13px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    color: #595959;
    background-color: #f5f5f5;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    background: ${styles.tealGreen};
    color: white;
  }
`;

export default SignIn;
