import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import Login from '../../components/Login';

const Welcome = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      WELCOME
      <Login />
      {isAuthenticated && <Redirect to="/dashboard" />}
    </div>
  );
};

export default Welcome;
