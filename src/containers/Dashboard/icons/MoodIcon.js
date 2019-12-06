import React from 'react';
import PropTypes from 'prop-types';

const MoodIcon = ({ size, strokeWidth, stroke }) => {
  return (
    <svg
      width={size}
      height={size}
      stroke={stroke}
      viewBox="0 0 188 188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M160 82.5C160 120.359 129.752 151 92.5 151C55.2476 151 25 120.359 25 82.5C25 44.6415 55.2476 14 92.5 14C129.752 14 160 44.6415 160 82.5Z"
        // stroke={color}
        strokeWidth={strokeWidth}
      />
      <line
        x1="93"
        y1="33"
        x2="93"
        y2="184"
        // stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="64.1964"
        y1="55.466"
        x2="91.9181"
        y2="71.9063"
        // stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="40.7605"
        y1="87.2413"
        x2="91.2752"
        y2="116.547"
        // stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="93.7543"
        y1="117.07"
        x2="144.391"
        y2="87.976"
        // stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="120.859"
        y1="56.2792"
        x2="92.7637"
        y2="72.0717"
        // stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

MoodIcon.propTypes = {
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
};

MoodIcon.defaultProps = {
  strokeWidth: 5,
  stroke: 'currentColor',
};

export default MoodIcon;
