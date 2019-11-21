import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import Logout from '../../components/Logout';

const Settings = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      SETTINGS
      {isAuthenticated && (
        <div>
          <Link to="/profile">Profile</Link>
        </div>
      )}
      <Logout />
    </div>
  );
};

export default Settings;
