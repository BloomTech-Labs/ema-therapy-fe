import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Switch } from 'antd';
import { useAuth } from '../../utils/dataStore';
import Logout from './Logout';
import Dashboard from '../Dashboard';
import styles from '../../styles/theme';

const GET_IS_SHARING_LOCATION = gql`
  query($email: String) {
    user(email: $email) {
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
  const { user } = useAuth();
  const [updateIsSharingLocation] = useMutation(UPDATE_IS_SHARING_LOCATION);
  const { loading, data } = useQuery(GET_IS_SHARING_LOCATION, {
    variables: { email: user.email },
  });

  useEffect(() => {
    if (!loading) {
      setIsSharingLocation(data.user.isSharingLocation);
    }
  }, [isSharingLocation, data, loading]);

  const toggleLocationPermissions = (checked) => {
    if (checked && 'geolocation' in navigator) {
      // if user switches the toggle permission setting to true
      // and has yet to give permission for the browser to use their location,
      // fire `getCurrentPosition`, so that we can get the
      // browser request now even though we aren't using their coords yet.
      navigator.geolocation.getCurrentPosition((p) => {
        // eslint-disable-next-line no-unused-vars
        const { latitude, longitude } = p.coords;
      });
    }
    updateIsSharingLocation({
      variables: { id: data.user.id, isSharingLocation: checked },
    });
  };

  return (
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

        <div className="setting-group">
          <h2 className="setting-group__heading">Account</h2>
          <div className="setting-group__item">
            <StyledLink to="/exportpdf">Export PDF</StyledLink>
          </div>
          <div className="setting-group__item">
            <Logout />
          </div>
        </div>
      </StyledSettings>
    </Dashboard>
  );
};

export default Settings;

const StyledSettings = styled.div`
  padding: 20px;

  h1 {
    font-size: 24px;
    line-height: 30px;
    padding: 20px 0 40px;
    font-weight: 600;
    color: ${styles.darkJungleGreen};
  }

  .ant-switch-checked {
    background-color: white !important;
  }

  .ant-switch-checked::after {
    background-color: ${styles.tealGreen};
  }

  .setting-group {
    margin-bottom: 20px;
  }

  .setting-group__heading {
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 10px;
    color: ${styles.darkJungleGreen};
  }

  .setting-group__item {
    height: 34px;
    background: ${styles.tealGreen};
    border-radius: 5px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    justify-content: space-between;
    color: white;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
