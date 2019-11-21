import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '../utils/react-auth0-spa';

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <StyledNav>
      {!isAuthenticated && (
        <button type="button" onClick={() => loginWithRedirect({})}>
          Log in
        </button>
      )}
    </StyledNav>
  );
};

export default Login;

const StyledNav = styled.div`
  display: flex;
  margin-top: 15px;

  a {
    margin-left: 10px;
  }
`;
