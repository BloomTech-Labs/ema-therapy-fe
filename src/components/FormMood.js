import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'antd/es/slider';
// import 'antd/dist/antd.css';

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
        <Slider
          // defaultValue={3}
          value={mood}
          onChange={onMoodSliderChange}
          min={1}
          max={5}
        />
      </div>
      <div className="footer">
        <button
          className="main-button"
          type="button"
          onClick={() => handleView('activity-journal')}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FormMood;
