import React from 'react';
import styled from 'styled-components';
// import Logo from '../../components/Logo';
import MobileNavBar from '../../components/MobileNavBar';
import MoodDisplay from '../../components/MoodDisplay';

const Dashboard = () => {
  return (
    <StyledDashboard>
      <StyledLogo>MoodBloom</StyledLogo>
      <MoodDisplay />
      <MobileNavBar />
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledLogo = styled.h1`
  font-size: 24px;
  line-height: 30px;
  padding: 20px 31px;
  font-weight: normal;
`;
