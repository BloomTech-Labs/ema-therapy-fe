import React from 'react';
import PropTypes from 'prop-types';
import { Button as Btn } from 'antd';
import theme from '../styles/theme';

const styles = {
  background: theme.tealGreen,
  color: '#FFFFFF',
  fontSize: '18px',
  borderRadius: 10,
  width: 167,
  height: 55,
  boxShadow: '0px 4px 4px #CCE8E4',
};

function Button({ children, onClick, loading }) {
  return (
    <Btn
      data-testid="button"
      loading={loading}
      onClick={onClick}
      style={styles}
    >
      {children}
    </Btn>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};

export default Button;
