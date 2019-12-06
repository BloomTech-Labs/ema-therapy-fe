import React from 'react';
import styled from 'styled-components';
import Dashboard from '../Dashboard';
import WeekDisplay from '../../components/WeekDisplay';

function Moods() {
  return (
    <Dashboard>
      <Wrapper>
        <StyledLogo>MoodBloom</StyledLogo>
        <WeekDisplay />
      </Wrapper>
    </Dashboard>
  );
}

export default Moods;

const StyledLogo = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0c423b;
  margin: unset;
  margin-bottom: 31px;
`;

const Wrapper = styled.div`
  background-color: #f0f8f7;
  padding: 27px 16px 80px;
  min-height: 100vh;
`;
