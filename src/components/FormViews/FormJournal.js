import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input } from 'antd';
import Button from './NextButton';
// import Activities from './Activities';

const { TextArea } = Input;

function FormActivityJournal({
  handleView,
  handleChange,
  text,
  handleSubmit,
  isSubmitting,
}) {
  return (
    <>
      <div className="header">
        <Icon
          className="back-btn"
          data-testid="back"
          type="left"
          onClick={() => handleView('activities')}
        />
        <p>
          What are you
          <br /> thinking?
        </p>
      </div>
      <TextArea
        name="text"
        value={text}
        data-testid="text"
        style={{
          fontSize: 16,
          height: '315px',
          color: '#658883',
          borderRadius: '10',
          padding: '35px 30px',
          background: '#ffffff',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
          resize: 'none',
        }}
        onChange={handleChange}
        placeholder="Write your thoughts here..."
      />
      <div className="footer">
        <Button loading={isSubmitting} onClick={handleSubmit}>
          Done
        </Button>
      </div>
    </>
  );
}

FormActivityJournal.propTypes = {
  text: PropTypes.string.isRequired,
  handleView: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  // addActivities: PropTypes.func.isRequired,
};

export default FormActivityJournal;
