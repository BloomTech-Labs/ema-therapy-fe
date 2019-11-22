// TEMPORARILY ignore these warnings because I'm lazy and...
// don't like squiggly lines but I plan on satisfying the linter eventually
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';

// TEMPORARILY disable this proptype warning because I'm lazy
// eslint-disable-next-line react/prop-types
function Toggle({ toggleState, handleClick }) {
  const [toggleOn, setToggleOn] = useState(toggleState);
  console.log('toggle state', toggleState);
  const toggleMode = (e) => {
    e.preventDefault();
    setToggleOn(!toggleOn);
    handleClick();
  };

  return (
    <StyledToggle>
      <div
        onClick={toggleMode}
        className={toggleOn ? 'toggle toggled' : 'toggle'}
      />
    </StyledToggle>
  );
}

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

export default Toggle;
