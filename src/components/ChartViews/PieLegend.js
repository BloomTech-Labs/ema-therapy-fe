import React from 'react';
import styled from 'styled-components';
import PieSlice from './PieSlice';

const PieLegend = ({ totalMoods }) => {
  return (
    <PieLegendWrapper>
      {totalMoods.map((sliceData) => {
        return <PieSlice sliceData={sliceData} />;
      })}
    </PieLegendWrapper>
  );
};

const PieLegendWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

export default PieLegend;
