import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

const FormMood = ({ onMoodSliderChange, mood, handleView }) => {
  return (
    <>
      <div className="header">
        <Link to="/dashboard">
          <button type="button" className="back">
            &larr;
          </button>
        </Link>
        <p>How do you feel?</p>
        <button className="main-button" type="submit">
          Done
        </button>
      </div>
      <div className="inputs">
        <Slider value={mood} onChange={onMoodSliderChange} min={1} max={5} />
      </div>
      <div className="footer">
        <button
          className="main-button"
          type="button"
          onClick={() => handleView('activity-journal')}
          data-testid="next"
        >
          Next
        </button>
      </div>
    </>
  );
};

FormMood.propTypes = {
  handleView: PropTypes.func.isRequired,
  mood: PropTypes.number.isRequired,
  onMoodSliderChange: PropTypes.func.isRequired,
};

export default FormMood;
