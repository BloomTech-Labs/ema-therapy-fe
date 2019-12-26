import React from 'react';
import PropTypes from 'prop-types';

const CalendarIcon = ({ fill }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z"
        fill={fill}
      />
      <path
        d="M28 6C28 9.31371 25.3137 12 22 12C18.6863 12 16 9.31371 16 6C16 2.68629 18.6863 0 22 0C25.3137 0 28 2.68629 28 6Z"
        fill={fill}
      />
      <path
        d="M28 22C28 25.3137 25.3137 28 22 28C18.6863 28 16 25.3137 16 22C16 18.6863 18.6863 16 22 16C25.3137 16 28 18.6863 28 22Z"
        fill={fill}
      />
      <path
        d="M12 22C12 25.3137 9.31371 28 6 28C2.68629 28 0 25.3137 0 22C0 18.6863 2.68629 16 6 16C9.31371 16 12 18.6863 12 22Z"
        fill={fill}
      />
    </svg>
  );
};

CalendarIcon.propTypes = {
  fill: PropTypes.string,
};

CalendarIcon.defaultProps = {
  fill: '#C7DDDA',
};

export default CalendarIcon;
