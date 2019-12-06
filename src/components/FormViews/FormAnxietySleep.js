import React from 'react';
import styled from 'styled-components';
import { Slider, Icon } from 'antd';
import PropTypes from 'prop-types';
import NextButton from './NextButton';
import DoneButton from './DoneButton';

function FormAnxietySleep({
  sleep,
  handleView,
  anxietyLevel,
  handleSubmit,
  isSubmitting,
  onSleepSliderChange,
  onAnxietySliderChange,
}) {
  return (
    <>
      <div className="header">
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => handleView('mood')}
        />
        <p>
          How stressed <br />
          are you?
        </p>
        <DoneButton loading={isSubmitting} onClick={handleSubmit}>
          Done
        </DoneButton>
      </div>
      <div className="inputs-section">
        <div className="inputs">
          <Label>Anxiety Level</Label>
          <SliderWrapper>
            <span>1</span>
            <Slider
              value={anxietyLevel}
              onChange={onAnxietySliderChange}
              min={1}
              max={10}
              style={{ flexGrow: 1 }}
            />
            <span>10</span>
          </SliderWrapper>
          <Label>Hours of sleep:</Label>
          <SliderWrapper>
            <span>1</span>
            <Slider
              value={sleep}
              onChange={onSleepSliderChange}
              min={1}
              max={10}
              style={{ flexGrow: 1 }}
            />
            <span>10+</span>
          </SliderWrapper>
        </div>
      </div>
      <div className="footer">
        <NextButton onClick={() => handleView('activity-journal')}>
          Next
        </NextButton>
      </div>
    </>
  );
}

FormAnxietySleep.propTypes = {
  handleView: PropTypes.func.isRequired,
  anxietyLevel: PropTypes.number.isRequired,
  onAnxietySliderChange: PropTypes.func.isRequired,
  onSleepSliderChange: PropTypes.func.isRequired,
  sleep: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default FormAnxietySleep;

const Label = styled.p`
  color: #00917a;
  font-size: 18px;
  padding-left: 20px;
  margin-bottom: 10px;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  &:first-of-type {
    margin-bottom: 72px;
  }

  span {
    color: #00917a;
    font-size: 14px;
    margin-top: 5px;
    &:first-of-type {
      padding-right: 8px;
    }

    &:not(:first-of-type) {
      padding-left: 8px;
    }
  }
`;
