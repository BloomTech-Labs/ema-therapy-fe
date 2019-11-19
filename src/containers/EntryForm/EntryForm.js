import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const EntryForm = () => {
  const [input, setInput] = useState({
    mood: 3,
    activities: [],
    journalText: '',
    anxiety: 5,
    sleep: 2,
  });
  const [view, setView] = useState('mood');

  // console.log(input);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSliderChange = (value) => {
    // console.log(value);
    setInput({ ...input, mood: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        MOOD
        <Slider value={input.mood} onChange={onSliderChange} min={1} max={5} />
      </div>
      <div>
        activities journal
        <input
          type="text"
          name="journalText"
          value={input.journalText}
          onChange={handleChange}
        />
      </div>
      <div></div>
    </form>
  );
};

export default EntryForm;
