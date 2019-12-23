import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';

const Logout = () => {
  const { setUser, setIsAuthenticated, setLoading } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    setUser({});
    setIsAuthenticated(false);
    localStorage.clear();
    setLoading(false);
    history.push('/signin');
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
