import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Slider, Icon } from 'antd';
import NextButton from './NextButton';
import moodToString from '../../utils/moodToString';
import DoneButton from './DoneButton';
import happyPlant from '../../assets/happy-plant.svg';

function FormMood({
  onMoodSliderChange,
  mood,
  handleView,
  handleSubmit,
  isSubmitting,
}) {
  return (
    <>
      <div className="header">
        <Link to="/dashboard">
          <Icon type="left" style={{ fontSize: 22, color: '#9cd9dd' }} />
        </Link>
        <p>
          How do you <br />
          feel?
        </p>
        <DoneButton loading={isSubmitting} onClick={handleSubmit}>
          Done
        </DoneButton>
      </div>
      <MoodWrapper>
        <img src={happyPlant} alt="happy plant" />

        <p>{moodToString(mood)}</p>
        <Slider
          min={1}
          max={5}
          value={mood}
          tooltipVisible={false}
          onChange={onMoodSliderChange}
        />
      </MoodWrapper>
      <div className="footer">
        <NextButton onClick={() => handleView('anxiety-sleep')}>
          Next
        </NextButton>
      </div>
    </>
  );
}

FormMood.propTypes = {
  handleView: PropTypes.func.isRequired,
  mood: PropTypes.number.isRequired,
  onMoodSliderChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default FormMood;

const MoodWrapper = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;

  p {
    text-align: center;
    color: #fcb924;
    font-size: 16px;
    text-transform: capitalize;
    margin-bottom: 0;
  }
`;
