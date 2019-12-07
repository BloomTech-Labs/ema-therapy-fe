import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../utils/react-auth0-spa';
import { Button } from 'antd';

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <StyledNav>
      {!isAuthenticated && (
        <>
          <Button className="btn signup" onClick={() => loginWithRedirect({})}>
            Sign up
          </Button>
          <Button className="btn signin" onClick={() => loginWithRedirect({})}>
            Sign in
          </Button>
        </>
      )}
    </StyledNav>
  );
};

export default Login;

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
