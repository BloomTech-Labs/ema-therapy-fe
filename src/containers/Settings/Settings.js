import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '../../utils/react-auth0-spa';
import Logout from '../../components/Logout';
import MobileNavBar from '../../components/MobileNavBar';

const Settings = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <StyledSettings>
        <h3>Settings</h3>

        {isAuthenticated && (
          <div>
            <Link to="/profile">Profile</Link>
          </div>
        )}
        <Logout />
      </StyledSettings>
      <MobileNavBar />
    </>
  );
};

const StyledSettings = styled.div`
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  padding: 30px 50px;

  a {
    text-decoration: none;
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

  a:hover {
    cursor: pointer;
  }
`;

export default Settings;
