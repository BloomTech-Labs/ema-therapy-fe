import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function sendPageView(location) {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
}

function GAListener({ children, trackingId, history }) {
  const NODE_ENV = process.env.REACT_APP_FORCE_NODE_ENV || process.env.NODE_ENV;

  useEffect(() => {
    ReactGA.initialize(trackingId, { debug: NODE_ENV === 'staging' });
    sendPageView(history.location);
    return history.listen(sendPageView);
  }, [history, trackingId, NODE_ENV]);

  return children;
}

GAListener.propTypes = {
  children: PropTypes.node,
  trackingId: PropTypes.string,
  history: PropTypes.shape({
    listen: PropTypes.func,
  }),
};

export default withRouter(GAListener);
