import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import { useAuth } from '../utils/dataStore';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    history.push('/signin');
  }, [loading, isAuthenticated, history]);

  const render = (props) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default PrivateRoute;
