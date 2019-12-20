import React from 'react';
import styled from 'styled-components';
import Dashboard from '../Dashboard';
import TaskWheel from '../../components/DailyTask/TaskWheel';

function Moods() {
  return (
    <Dashboard>
      <Wrapper>
        <TaskWheel />
      </Wrapper>
    </Dashboard>
  );
}

export default Moods;

const Wrapper = styled.div`
  background-color: #f0f8f7;
  padding: 30px 0;
  min-height: 100vh;
`;
