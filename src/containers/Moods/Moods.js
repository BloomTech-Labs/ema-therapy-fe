import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from '../Dashboard';
import WeekDisplay from '../../components/WeekDisplay';
import CalendarIcon from './CalendarIcon';

function Moods() {
  return (
    <Dashboard>
      <Wrapper>
        <Header>
          <StyledLogo>MoodBloom</StyledLogo>
          <Link to="/calendar">
            <CalendarIcon />
          </Link>
        </Header>
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
  margin-bottom: unset;
`;

const Wrapper = styled.div`
  background-color: #f0f8f7;
  padding: 27px 27px 80px;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
`;
