import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import Logout from './Logout';
import Dashboard from '../Dashboard';

const Settings = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Dashboard>
      <StyledSettings>
        <h1>Settings</h1>
        <div className="setting-group">
          <h2 className="setting-group__heading">Preferences</h2>
          <div className="setting-group__item">Share My Location</div>
          <div className="setting-group__item">Dark Mode</div>
        </div>
        {isAuthenticated && <StyledLink to="/profile">Profile</StyledLink>}
        <Logout />
      </StyledSettings>
    </Dashboard>
  );
};

export default Settings;

const StyledSettings = styled.div`
  h1 {
    font-size: 24px;
    line-height: 30px;
    padding: 20px 0;
    font-weight: normal;
  }

  .setting-group {
    margin-bottom: 20px;
  }

  .setting-group__heading {
    font-size: 15px;
    font-weight: normal;
    margin: 0 0 3px;
  }

  .setting-group__item {
    height: 34px;
    background: #c4c4c4;
    border-radius: 5px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
  }
`;

const StyledLink = styled(Link)`
  /* font-size: 15px; */
  color: #000;
  text-decoration: none;
`;
