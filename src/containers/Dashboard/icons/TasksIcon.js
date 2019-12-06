import React from 'react';
import PropTypes from 'prop-types';

const TasksIcon = ({ size, strokeWidth, stroke }) => {
  return (
    <svg
      height={size}
      stroke={stroke}
      viewBox="0 0 217 188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="95.5"
        cy="92.5"
        r="85"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M147.5 93C147.5 121.421 124.241 144.5 95.5 144.5C66.7594 144.5 43.5 121.421 43.5 93C43.5 64.579 66.7594 41.5 95.5 41.5C124.241 41.5 147.5 64.579 147.5 93Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="96"
        cy="93"
        r="21.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <line
        x1="94.9972"
        y1="92.4731"
        x2="203.007"
        y2="92.4731"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M169 79.5L161 92.5L169 107L208 106.5L202.5 92.5L208 79.5H169Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
};

TasksIcon.propTypes = {
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
};

TasksIcon.defaultProps = {
  strokeWidth: 5,
  stroke: 'currentColor',
};

export default TasksIcon;
