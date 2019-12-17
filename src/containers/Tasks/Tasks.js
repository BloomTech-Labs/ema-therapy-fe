import React from 'react';
import styled from 'styled-components';
import Dashboard from '../Dashboard';
import Wheel from '../../components/Wheel';

function Moods() {
  return (
    <Dashboard>
      <Wrapper>
        <Wheel />
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
