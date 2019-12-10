import React from 'react';
import PropTypes from 'prop-types';

const PlusIcon = ({ size, strokeWidth, stroke }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="51"
        y1="5"
        x2="51"
        y2="95"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="5"
        y1="47"
        x2="95"
        y2="47"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

PlusIcon.propTypes = {
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
};

PlusIcon.defaultProps = {
  strokeWidth: 10,
  stroke: 'currentColor',
};

export default PlusIcon;
