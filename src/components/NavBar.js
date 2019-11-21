import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '../utils/react-auth0-spa';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <StyledNav>
      {!isAuthenticated && (
        <button type="button" onClick={() => loginWithRedirect({})}>
          Log in
        </button>
      )}

      {isAuthenticated && (
        <button type="button" onClick={() => logout()}>
          Log out
        </button>
      )}
      {isAuthenticated && (
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
        </div>
      )}
    </StyledNav>
  );
};

export default NavBar;

const StyledNav = styled.div`
  display: flex;
  margin-top: 15px;

  a {
    margin-left: 10px;
  }
`;
