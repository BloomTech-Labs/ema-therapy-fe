import React from 'react';
import styled from 'styled-components';
import Dashboard from '../Dashboard';
import WeekDisplay from '../../components/WeekDisplay';

function Moods() {
  return (
    <Dashboard>
      <StyledLogo>MoodBloom</StyledLogo>
      <WeekDisplay />
    </Dashboard>
  );
}

export default Moods;

const StyledLogo = styled.h1`
  font-size: 24px;
  line-height: 30px;
  padding: 20px 0;
  font-weight: normal;
`;
