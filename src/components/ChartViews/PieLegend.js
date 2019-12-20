import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PieSlice from './PieSlice';

const PieLegend = ({ totalMoods }) => {
  return (
    <PieLegendWrapper>
      {totalMoods.map((sliceData) => {
        return <PieSlice sliceData={sliceData} key={sliceData.color} />;
      })}
    </PieLegendWrapper>
  );
};

const PieLegendWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

PieLegend.propTypes = {
  totalMoods: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      mood: PropTypes.string,
      percent: PropTypes.number,
    }),
  ).isRequired,
};

export default PieLegend;
