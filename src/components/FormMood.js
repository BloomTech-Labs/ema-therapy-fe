import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Slider, Icon } from 'antd';
import Button from './Button';

const FormMood = ({ onMoodSliderChange, mood, handleView, handleSubmit }) => {
  return (
    <>
      <div className="header">
        <Link to="/dashboard">
          <Icon type="left-circle" style={{ fontSize: 35, color: '#9cd9dd' }} />
        </Link>
        <p>
          How do you <br />
          feel?
        </p>
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
