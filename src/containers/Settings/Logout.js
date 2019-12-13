import React from 'react';
import { useAuth0 } from '../../utils/react-auth0-spa';

// backend needs a /logout endpoint

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => logout()}
      onKeyDown={() => logout()}
    >
      Log out
    </div>
  );
};

export default Logout;
