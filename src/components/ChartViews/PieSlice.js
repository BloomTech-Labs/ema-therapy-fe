import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PieIcon from './PieIcon';

const PieSlice = ({ sliceData }) => {
  return (
    <PieSliceWrapper>
      <PieIcon color={sliceData.color} size="15px" />
      <PieP1>{sliceData.mood}</PieP1>
      <PieP2>{sliceData.percent}%</PieP2>
    </PieSliceWrapper>
  );
};

PieSlice.propTypes = {
  sliceData: PropTypes.shape({
    color: PropTypes.string.isRequired,
    mood: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
};

const PieSliceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PieP1 = styled.p`
  margin: 0;
  margin-top: 9px;
`;

const PieP2 = styled.p`
  margin: 0;
`;

export default PieSlice;
