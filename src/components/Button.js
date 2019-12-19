import React from 'react';
import PropTypes from 'prop-types';
import { Button as Btn } from 'antd';

const styles = {
  background: '#ffffff',
  color: '#89D2D6',
  fontSize: '12px',
  borderRadius: 10,
  width: 70,
  height: 30,
  border: 'none',
  marginRight: '-7px',
  marginTop: '6px',
};

function Button({ loading, children, onClick }) {
  return (
    <Btn loading={loading} onClick={onClick} style={styles}>
      {children}
    </Btn>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Button;
