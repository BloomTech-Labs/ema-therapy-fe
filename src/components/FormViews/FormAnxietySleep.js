import React from 'react';
import { Slider } from 'antd';
import PropTypes from 'prop-types';
import NextButton from './NextButton';

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
        <button
          type="button"
          className="back"
          onClick={() => handleView('mood')}
        >
          &larr;
        </button>
        <p>How stressed are you?</p>
        <button type="button" onClick={handleSubmit}>
          Done
        </button>
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
