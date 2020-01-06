import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/theme';

const PieLegendIcon = ({ color, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="4" />
    </svg>
  );
};
PieLegendIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};
PieLegendIcon.defaultProps = {
  color: styles.darkJungleGreen,
  size: '20px',
};
export default PieLegendIcon;
