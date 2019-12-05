import React from 'react';
import PropTypes from 'prop-types';
// import Activities from './Activities';
import Button from './Button';

const FormActivityJournal = ({
  handleView,
  handleChange,
  text,
  handleSubmit,
}) => {
  return (
    <>
      <div className="header">
        <button
          type="button"
          className="back"
          onClick={() => handleView('anxiety-sleep')}
        >
          &larr;
        </button>
        <p>What are you thinking?</p>
      </div>
      {/* <Activities addActivities={addActivities} /> */}
      <div className="input-section">
        <div className="inputs">
          <textarea
            type="text"
            name="text"
            placeholder="write your thoughts here"
            value={text}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="footer">
        <Button onClick={handleSubmit}>Done</Button>
      </div>
    </>
  );
};

FormActivityJournal.propTypes = {
  handleView: PropTypes.func.isRequired,
  // addActivities: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormActivityJournal;
