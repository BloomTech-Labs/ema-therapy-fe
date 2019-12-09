import React from 'react';
import styled from 'styled-components';
import MobileNavBar from '../../components/MobileNavBar';
import ChartViews from '../../components/ChartViews';

const Charts = () => {
  return (
    <StyledCharts>
      <ChartViews />
      <MobileNavBar />
    </StyledCharts>
  );
};

export default Charts;

const StyledCharts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
