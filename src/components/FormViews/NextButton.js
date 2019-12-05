import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const styles = {
  // background: theme.primaryColor,
  // fontFamily: theme.fontFamily,
  background: 'purple',
  color: '#FFFFFF',
  fontSize: '18px',
  borderRadius: 10,
  width: 167,
  height: 55,
  boxShadow: '0px 4px 4px #CCE8E4',
};

function NextButton({ children, onClick }) {
  return (
    <Button onClick={onClick} style={styles}>
      {children}
    </Button>
  );
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default NextButton;
