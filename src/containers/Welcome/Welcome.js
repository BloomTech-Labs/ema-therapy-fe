import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '../../utils/react-auth0-spa';
import Login from '../../components/Login';
import styles from '../../styles/theme';
import splash from '../../assets/splash-leaves.png';

const Welcome = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <StyledWelcome>
      <h2>MoodBloom</h2>
      <LoginWrapper>
        <div className="slogan-text">
          <h1>Mood Tracker</h1>
          <p>Flourish into a healthier, happier you</p>
        </div>
        <Login />
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

export default Welcome;
