import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '../../utils/react-auth0-spa';
import Login from '../../components/Login';

const Welcome = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <StyledWelcome>
      WELCOME
      <Login />
      {isAuthenticated && <Redirect to="/dashboard" />}
    </StyledWelcome>
  );
};

const StyledWelcome = styled.div`
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  border: 2px solid black;
  text-align: center;
  padding: 25%;
`;

export default Welcome;
