import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

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

function DoneButton({ loading, children, onClick }) {
  return (
    <Button loading={loading} onClick={onClick} style={styles}>
      {children}
    </Button>
  );
}

DoneButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DoneButton;
