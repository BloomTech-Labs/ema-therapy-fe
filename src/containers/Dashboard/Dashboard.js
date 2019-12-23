import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MobileNavBar from '../../components/MobileNavBar';

const Dashboard = ({ children }) => {
  return (
    <StyledDashboard>
      <div className="dashboard-main">{children}</div>
      <MobileNavBar />
    </StyledDashboard>
  );
};

Dashboard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .dashboard-main {
    height: 100%;
  }
`;
