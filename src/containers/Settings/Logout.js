import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  const logout = () => history.push('/');

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
