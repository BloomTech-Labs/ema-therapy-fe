import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Slider, Icon } from 'antd';
import NextButton from './NextButton';
import moodToString from '../../utils/moodToString';
import DoneButton from './DoneButton';
import happyPlant from '../../assets/plant-happy.svg';
import normalPlant from '../../assets/plant-normal.svg';
import sadPlant from '../../assets/plant-sad.svg';
import reallyHappyPlant from '../../assets/plant-reallyhappy.svg';
import unhappyPlant from '../../assets/plant-unhappy.svg';
import useIsAppInStandalone from '../../hooks/useIsAppInStandalone';

function FormMood({
  onMoodSliderChange,
  mood,
  handleView,
  handleSubmit,
  isSubmitting,
}) {
  const history = useHistory();
  const isAppInStandalone = useIsAppInStandalone();

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
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.push('/dashboard')}
        />
        <p>
          How do you <br />
          feel?
        </p>
        <DoneButton loading={isSubmitting} onClick={handleSubmit}>
          Done
        </DoneButton>
      </div>
      <MoodWrapper isStandalone={isAppInStandalone}>
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

  img {
    margin-bottom: 15px;
  }

  @media only screen and (max-width: 375px) {
    img {
      height: ${(props) => (props.isStandalone ? '300px' : '250px')};
    }
  }
`;
