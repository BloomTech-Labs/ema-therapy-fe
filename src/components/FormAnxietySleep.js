import React from 'react';
import Slider from 'antd/es/slider';
// import 'antd/dist/antd.css';

const FormAnxietySleep = ({
  handleView,
  anxietyLevel,
  onAnxietySliderChange,
  handleChange,
  sleep,
}) => {
  return (
    <>
      <div className="header">
        <button
          type="button"
          className="back"
          onClick={() => handleView('activity-journal')}
        >
          &larr;
        </button>
        <p>How stressed are you this moment from 1 - 10?</p>
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
        <button className="main-button" type="submit">
          Done
        </button>
      </div>
    </>
  );
};

export default FormAnxietySleep;
