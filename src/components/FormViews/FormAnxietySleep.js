import React from 'react';
import styled from 'styled-components';
import { Slider, Icon } from 'antd';
import PropTypes from 'prop-types';
import NextButton from './NextButton';

function FormAnxietySleep({
  sleep,
  handleView,
  anxietyLevel,
  onSleepSliderChange,
  onAnxietySliderChange,
}) {
  return (
    <>
      <div className="header">
        <Icon
          className="back-btn"
          type="left"
          data-testid="back"
          onClick={() => handleView('mood')}
        />
        <p>
          How stressed <br />
          are you?
        </p>
      </div>
      <div className="inputs-section">
        <div className="inputs">
          <Label>Anxiety Level</Label>
          <SliderWrapper>
            <span>0</span>
            <Slider
              value={anxietyLevel}
              onChange={onAnxietySliderChange}
              min={0}
              max={10}
              style={{ flexGrow: 1 }}
            />
            <span>10</span>
          </SliderWrapper>
          <Label>Hours of sleep (since last entry)</Label>
          <SliderWrapper>
            <span>0</span>
            <Slider
              value={sleep}
              onChange={onSleepSliderChange}
              min={0}
              max={10}
              style={{ flexGrow: 1 }}
            />
            <span>10+</span>
          </SliderWrapper>
        </div>
      </div>
      <div className="footer">
        <NextButton data-testid="next" onClick={() => handleView('activities')}>
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
