import React from 'react';
import { useAuth0 } from '../utils/react-auth0-spa';

const Logout = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <button type="button" onClick={() => logout()}>
          Log out
        </button>
      )}
    </div>
  );
};

export default Logout;
