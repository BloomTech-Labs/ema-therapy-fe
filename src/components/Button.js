import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntdButton } from 'antd';
import theme from '../styles/theme';

const styles = {
  background: theme.primaryColor,
  fontFamily: theme.fontFamily,
  color: '#FFFFFF',
  fontSize: '18px',
  borderRadius: 10,
  width: 167,
  height: 55,
  boxShadow: '0px 4px 4px #CCE8E4',
};

function Button({ children, onClick }) {
  return (
    <AntdButton onClick={onClick} style={styles}>
      {children}
    </AntdButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Button;
