import React from 'react';
import PropTypes from 'prop-types';

const TasksIcon = ({ size, strokeWidth, stroke }) => {
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
        d="M157.5 93C157.5 134.713 123.906 168.5 82.5 168.5C41.0938 168.5 7.5 134.713 7.5 93C7.5 51.2873 41.0938 17.5 82.5 17.5C123.906 17.5 157.5 51.2873 157.5 93Z"
        strokeWidth={strokeWidth}
      />
      <path
        d="M129.5 93C129.5 118.657 108.481 139.5 82.5 139.5C56.5186 139.5 35.5 118.657 35.5 93C35.5 67.3426 56.5186 46.5 82.5 46.5C108.481 46.5 129.5 67.3426 129.5 93Z"
        strokeWidth={strokeWidth}
      />
      <path
        d="M102.5 93C102.5 103.717 93.599 112.5 82.5 112.5C71.401 112.5 62.5 103.717 62.5 93C62.5 82.2831 71.401 73.5 82.5 73.5C93.599 73.5 102.5 82.2831 102.5 93Z"
        strokeWidth={strokeWidth}
      />
      <line
        x1="81.9972"
        y1="92.4731"
        x2="178.007"
        y2="92.4731"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="178.886"
        y1="91.4003"
        x2="183.4"
        y2="80.1142"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="178.6"
        y1="92.1142"
        x2="183.114"
        y2="103.4"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1="142.719"
        y1="91.1856"
        x2="151.717"
        y2="80.1877"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="142.814"
        y1="93.2814"
        x2="151.616"
        y2="104.039"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="152"
        y1="80"
        x2="183"
        y2="80"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="152"
        y1="104"
        x2="183"
        y2="104"
        // stroke="#C4C4C4"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
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
