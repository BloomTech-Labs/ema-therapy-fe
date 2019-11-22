import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../utils/react-auth0-spa';

const Logout = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <StyledLogout>
      {isAuthenticated && (
        <button type="button" onClick={() => logout()}>
          Log out
        </button>
      )}
    </StyledLogout>
  );
};

const StyledLogout = styled.div`
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
    margin: 15px 0;
  }
`;

export default Logout;
