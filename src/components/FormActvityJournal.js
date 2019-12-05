import React from 'react';
import PropTypes from 'prop-types';
import Activities from './Activities';

const FormActivityJournal = ({
  handleView,
  addActivities,
  handleChange,
  text,
}) => {
  return (
    <>
      <div className="header">
        <button
          type="button"
          className="back"
          onClick={() => handleView('mood')}
          data-testid="back"
        >
          &larr;
        </button>
        <p>What have you been up to?</p>
        <button className="main-button" type="submit">
          Done
        </button>
      </div>
      <Activities addActivities={addActivities} />
      <div className="input-section">
        <div className="inputs">
          <textarea
            type="text"
            name="text"
            data-testid="text"
            placeholder="write your thoughts here"
            value={text}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="footer">
        <button
          type="button"
          className="main-button"
          onClick={() => handleView('anxiety-sleep')}
        >
          Next
        </button>
      </div>
    </>
  );
};

FormActivityJournal.propTypes = {
  handleView: PropTypes.func.isRequired,
  addActivities: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default FormActivityJournal;
