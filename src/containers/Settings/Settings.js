import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Switch from 'antd/es/switch';
import { useAuth0 } from '../../utils/react-auth0-spa';
import Logout from './Logout';
import Dashboard from '../Dashboard';

const GET_IS_SHARING_LOCATION = gql`
  query($sub: ID) {
    user(sub: $sub) {
      isSharingLocation
      id
    }
  }
`;

const UPDATE_IS_SHARING_LOCATION = gql`
  mutation($id: ID!, $isSharingLocation: Boolean!) {
    updateIsSharingLocation(id: $id, isSharingLocation: $isSharingLocation) {
      isSharingLocation
      id
    }
  }
`;

const Settings = () => {
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const { user } = useAuth0();
  const [updateIsSharingLocation] = useMutation(UPDATE_IS_SHARING_LOCATION);
  const { loading, data } = useQuery(GET_IS_SHARING_LOCATION, {
    variables: { sub: user.sub },
  });

  useEffect(() => {
    if (!loading) {
      setIsSharingLocation(data.user.isSharingLocation);
    }
  }, [isSharingLocation, data, loading]);

  const toggleLocationPermissions = (checked) => {
    updateIsSharingLocation({
      variables: { id: data.user.id, isSharingLocation: checked },
    });
  };

  return loading ? null : (
    <Dashboard>
      <StyledSettings>
        <h1>Settings</h1>
        <div className="setting-group">
          <h2 className="setting-group__heading">Preferences</h2>
          <div className="setting-group__item">
            <span>Share My Location</span>
            <Switch
              loading={loading}
              checked={isSharingLocation}
              onChange={toggleLocationPermissions}
            />
          </div>
        </div>
        <StyledLink to="/profile">Profile</StyledLink>
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
    padding: 0 10px;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    justify-content: space-between;
  }
`;

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
`;
