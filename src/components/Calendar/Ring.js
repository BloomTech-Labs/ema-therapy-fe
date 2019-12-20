import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/theme';

const Ring = ({ color, size, strokeWidth, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
    >
      <circle cx="14" cy="14" r="13" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
};

Ring.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  strokeWidth: PropTypes.string,
  className: PropTypes.string,
};

Ring.defaultProps = {
  color: styles.darkJungleGreen,
  size: '28',
  strokeWidth: '2',
  className: '',
};

export default Ring;
