import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Slider } from 'antd';
import Button from './Button';

const FormMood = ({ onMoodSliderChange, mood, handleView, handleSubmit }) => {
  return (
    <>
      <div className="header">
        <Link to="/dashboard">
          <button type="button" className="back">
            &larr;
          </button>
        </Link>
        <p>How do you feel?</p>
        <button type="button" onClick={handleSubmit}>
          Done
        </button>
      </div>
      <div className="inputs">
        <Slider value={mood} onChange={onMoodSliderChange} min={1} max={5} />
      </div>
      <div className="footer">
        <Button onClick={() => handleView('anxiety-sleep')}>Next</Button>
      </div>
    </>
  );
};

FormMood.propTypes = {
  handleView: PropTypes.func.isRequired,
  mood: PropTypes.number.isRequired,
  onMoodSliderChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormMood;
