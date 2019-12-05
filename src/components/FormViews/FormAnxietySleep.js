import React from 'react';
import { Slider, Icon } from 'antd';
import PropTypes from 'prop-types';
import NextButton from './NextButton';
import DoneButton from './DoneButton';

const FormAnxietySleep = ({
  handleView,
  anxietyLevel,
  onAnxietySliderChange,
  handleChange,
  sleep,
  handleSubmit,
}) => {
  return (
    <>
      <div className="header">
        <Icon
          type="left-circle"
          style={{ fontSize: 35, color: '#9cd9dd' }}
          onClick={() => handleView('mood')}
        />
        <p>
          How stressed <br />
          are you?
        </p>
        <DoneButton onClick={handleSubmit}>Done</DoneButton>
      </div>
      <div className="inputs-section">
        <div className="inputs">
          <p>Anxiety Level</p>
          <Slider
            value={anxietyLevel}
            onChange={onAnxietySliderChange}
            min={1}
            max={10}
          />
        </div>
        <div className="inputs">
          <label htmlFor="sleep">
            Hours of sleep:
            <input
              type="number"
              name="sleep"
              id="sleep"
              value={sleep}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <div className="footer">
        <NextButton onClick={() => handleView('activity-journal')}>
          Next
        </NextButton>
      </div>
    </>
  );
};

FormAnxietySleep.propTypes = {
  handleView: PropTypes.func.isRequired,
  anxietyLevel: PropTypes.number.isRequired,
  onAnxietySliderChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  sleep: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormAnxietySleep;
