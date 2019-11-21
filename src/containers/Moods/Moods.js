import React from 'react';
import styled from 'styled-components';
import Dashboard from '../Dashboard';
import MoodDisplay from '../../components/MoodDisplay';

function Moods() {
  return (
    <Dashboard>
      <StyledLogo>MoodBloom</StyledLogo>
      <MoodDisplay />
    </Dashboard>
  );
}

export default Moods;

const StyledLogo = styled.h1`
  font-size: 24px;
  line-height: 30px;
  padding: 20px 31px;
  font-weight: normal;
`;
