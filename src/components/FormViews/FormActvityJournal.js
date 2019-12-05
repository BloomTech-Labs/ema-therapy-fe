import React from 'react';
import PropTypes from 'prop-types';
// import Activities from './Activities';
import { Icon, Input } from 'antd';
import Button from './NextButton';

const { TextArea } = Input;

const FormActivityJournal = ({
  handleView,
  handleChange,
  text,
  handleSubmit,
}) => {
  return (
    <>
      <Icon
        type="left-circle"
        onClick={() => handleView('anxiety-sleep')}
        style={{
          fontSize: 35,
          color: '#9cd9dd',
          position: 'absolute',
          top: 30,
          left: 25,
        }}
      />
      <div className="header" style={{ justifyContent: 'center' }}>
        <p>
          What are you
          <br /> thinking?
        </p>
      </div>
      <TextArea
        rows={4}
        type="text"
        name="text"
        placeholder="Write your thoughts here..."
        value={text}
        onChange={handleChange}
        style={{
          height: '315px',
          background: '#c7ddda',
          fontSize: 16,
          borderRadius: '24px',
          padding: '35px 30px',
          color: '#ffffff',
          boxShadow: '0px 0px 4px #C7DDDA',
        }}
      />
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
