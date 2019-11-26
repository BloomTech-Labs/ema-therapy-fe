/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Toggle({ toggleState, handleToggle }) {
  return (
    <StyledToggle>
      <div
        onClick={() => handleToggle()}
        className={toggleState ? 'toggle toggled' : 'toggle'}
      />
    </StyledToggle>
  );
}

Toggle.propTypes = {
  toggleState: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default Toggle;

const StyledToggle = styled.div`
  background: papayawhip;
  border-radius: 50px;
  border: 1px solid black;
  height: 20px;
  position: relative;
  width: 40px;

  .toggle {
    background: #f68819;
    border-radius: 50px;
    height: 18px;
    left: 0;
    position: absolute;
    transition: 0.2s;
    width: 20px;
  }

  .toggled {
    left: 18px;
  }
`;
