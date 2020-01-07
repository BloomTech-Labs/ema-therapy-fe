import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Slider, Icon } from 'antd';
import NextButton from './NextButton';
import moodToString from '../../utils/moodToString';
import useStandalone from '../../hooks/useStandalone';
import happyPlant from '../../assets/plants-png/plant-happy.png';
import normalPlant from '../../assets/plants-png/plant-normal.png';
import sadPlant from '../../assets/plants-png/plant-sad.png';
import reallyHappyPlant from '../../assets/plants-png/plant-really-happy.png';
import unhappyPlant from '../../assets/plants-png/plant-unhappy.png';

function FormMood({ onMoodSliderChange, mood, handleView, stopEditing }) {
  const history = useHistory();
  const isStandalone = useStandalone();

  const getPlant = (m) => {
    let plant;
    if (m === 1) plant = unhappyPlant;
    if (m === 2) plant = sadPlant;
    if (m === 3) plant = normalPlant;
    if (m === 4) plant = happyPlant;
    if (m === 5) plant = reallyHappyPlant;
    return plant;
  };

  return (
    <>
      <div className="header">
        <Icon
          className="back-btn"
          type="left"
          onClick={() =>
            stopEditing ? stopEditing() : history.push('/dashboard')
          }
        />
        <p>
          How do you <br />
          feel?
        </p>
      </div>
      <MoodWrapper isStandalone={isStandalone}>
        <img src={getPlant(mood)} alt="happy plant" />

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
        <NextButton
          data-testid="next"
          onClick={() => handleView('anxiety-sleep')}
        >
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
  stopEditing: PropTypes.func,
};

FormMood.defaultProps = {
  stopEditing: null,
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

  img {
    margin-bottom: 15px;
    height: 350px;
    width: 228px;
    align-self: center;
  }

  @media only screen and (max-width: 375px) {
    img {
      height: ${(props) => (props.isStandalone ? '300px' : '250px')};
      width: ${(props) => (props.isStandalone ? '195px' : '163px')};
    }
  }
`;
