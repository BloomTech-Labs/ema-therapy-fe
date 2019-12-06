import React from 'react';
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
  justify-content: center;
  margin-top: 15px;

  a {
    margin-left: 10px;
  }

  button {
    height: 35px;
    width: 120px;
    font-size: 14px;
    border: none;
    border-radius: 3px;
    color: #000;
    background-color: darkgrey;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
