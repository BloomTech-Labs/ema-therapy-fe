import React from 'react';
import PropTypes from 'prop-types';

const ChartsIcon = ({ size, strokeWidth, stroke }) => {
  return (
    <svg
      width={size}
      height={size}
      stroke={stroke}
      viewBox="0 0 188 188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="95" cy="95" r="87.5" strokeWidth={strokeWidth} />
      <path
        d="M164.5 95C164.5 133.969 133.351 165.5 95 165.5C56.6486 165.5 25.5 133.969 25.5 95C25.5 56.0313 56.6486 24.5 95 24.5C133.351 24.5 164.5 56.0313 164.5 95Z"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
      />
      <line
        x1="60.1744"
        y1="32.7678"
        x2="94.1757"
        y2="92.7671"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
      />
      <line
        x1="70.0849"
        y1="158.668"
        x2="94.2251"
        y2="93.3385"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
      />
      <line
        x1="93.5671"
        y1="94.3916"
        x2="143.055"
        y2="45.3851"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
      />
      <line
        x1="93.9997"
        y1="94.2889"
        x2="160.702"
        y2="74.2519"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

ChartsIcon.propTypes = {
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
};

ChartsIcon.defaultProps = {
  strokeWidth: 5,
  stroke: 'currentColor',
};

export default ChartsIcon;
