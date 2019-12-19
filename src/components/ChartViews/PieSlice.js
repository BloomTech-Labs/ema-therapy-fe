import React from 'react';
import styled from 'styled-components';
import PieIcon from './PieIcon';

const PieSlice = ({ sliceData }) => {
  return (
    <PieSliceWrapper>
      <PieIcon color={sliceData.color} size={'15px'} />
      <p>{sliceData.mood}</p>
      <p>{sliceData.percent}%</p>
    </PieSliceWrapper>
  );
};

const PieSliceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default PieSlice;
