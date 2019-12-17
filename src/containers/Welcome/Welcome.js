import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { useAuth } from '../../utils/dataStore';
import styles from '../../styles/theme';
import splash from '../../assets/splash-leaves.png';

const Welcome = () => {
  const { isAuthenticated } = useAuth();
  const history = useHistory();
  return (
    <StyledWelcome>
      <h2>MoodBloom</h2>
      <LoginWrapper>
        <div className="slogan-text">
          <h1>Mood Tracker</h1>
          <p>Flourish into a healthier, happier you</p>
        </div>
        <StyledNav>
          <Button
            className="btn signup"
            onClick={() => history.push('/signup')}
          >
            Sign up
          </Button>
          <Button
            className="btn signin"
            onClick={() => history.push('/signin')}
          >
            Sign in
          </Button>
        </StyledNav>
      </LoginWrapper>

      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledWelcome>
  );
};

const StyledWelcome = styled.div`
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  padding: 30px 20px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${styles.darkJungleGreen};
  background: url(${splash}) no-repeat center;
  background-size: 155%;
  color: white;

  h2 {
    color: white;
    font-weight: 600;
    font-size: 18px;
    padding-left: 7px;
  }
`;

const LoginWrapper = styled.div`
  .slogan-text {
    padding: 0 17px;
  }

  h1 {
    color: white;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 24px;
  }
`;

const StyledNav = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 15px;

  a {
    margin-left: 10px;
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

  .signin {
    border: 1px solid #ffffff;
    background-color: transparent;
    color: #f5f5f5;
    margin: unset;
  }
`;

export default Welcome;
