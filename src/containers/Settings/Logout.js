import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';

// backend needs a /logout endpoint

const Logout = () => {
  const { setUser, setIsAuthenticated, setLoading } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    setUser({});
    setIsAuthenticated(false);
    setLoading(false);
    history.push('/welcome');
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleLogout()}
      onKeyDown={() => handleLogout()}
    >
      Log out
    </div>
  );
};

export default Logout;
