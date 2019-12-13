import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MobileNavBar from '../../components/MobileNavBar';
// import ChartViews from '../../components/ChartViews';

const Charts = ({ children }) => {
  return (
    <StyledCharts>
      <div className="charts-main">{children}</div>
      <MobileNavBar />
    </StyledCharts>
  );
};

export default Charts;

Charts.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const StyledCharts = styled.div`
  background-color: #fafdfc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .charts-main {
    min-height: 100%;
  }
`;
