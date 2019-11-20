import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MoodPreview = ({ mood }) => {
  return (
    <StyledPreview>
      <p>mood: {mood.mood}</p>
    </StyledPreview>
  );
};

MoodPreview.propTypes = {
  mood: PropTypes.shape({
    mood: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    anxietyLevel: PropTypes.number,
    text: PropTypes.string,
    sleep: PropTypes.number,
  }).isRequired,
};

export default MoodPreview;

const StyledPreview = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 5px;
`;
