import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/theme';

const MoodLegendIcon = ({ color, size, strokeWidth }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
};

MoodLegendIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  strokeWidth: PropTypes.string,
};

MoodLegendIcon.defaultProps = {
  color: styles.darkJungleGreen,
  size: '20',
  strokeWidth: '4',
};

export default MoodLegendIcon;
