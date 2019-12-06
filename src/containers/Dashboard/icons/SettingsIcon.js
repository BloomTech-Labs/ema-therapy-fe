import React from 'react';
import PropTypes from 'prop-types';

const SettingsIcon = ({ size, strokeWidth, stroke }) => {
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
        d="M40 23L22 41.5L30.5 61.5L26 72.5L5.5 80V107L26 115L30.5 126L22 145L41.5 165L60.5 156.5L71.5 161L79.5 181H106L114.5 161L125 156.5L144 165L164 145L155 126L159.5 115L180 107V80L159.5 72.5L155 60.5L164 41.5L144 23L125 31.5L114.5 27L106 6.5H79.5L71.5 27L60.5 31.5L40 23Z"
        // stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="93.5"
        cy="93.5"
        r="46"
        // stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="93.5"
        cy="93.5"
        r="18"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

SettingsIcon.propTypes = {
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
};

SettingsIcon.defaultProps = {
  strokeWidth: 5,
  stroke: 'currentColor',
};

export default SettingsIcon;
