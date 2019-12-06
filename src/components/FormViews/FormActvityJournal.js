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
      <Icon
        style={{
          top: 30,
          left: 25,
          fontSize: 22,
          color: '#9cd9dd',
          position: 'absolute',
        }}
        type="left"
        onClick={() => handleView('anxiety-sleep')}
      />
      <div className="header center">
        <p>
          What are you
          <br /> thinking?
        </p>
      </div>
      <TextArea
        name="text"
        value={text}
        style={{
          fontSize: 16,
          height: '315px',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '35px 30px',
          background: '#c7ddda',
          boxShadow: '0px 0px 4px #C7DDDA',
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
