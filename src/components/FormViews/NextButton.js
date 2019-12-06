import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import theme from '../../styles/theme';

const styles = {
  background: theme.tealGreen,
  color: '#FFFFFF',
  fontSize: '18px',
  borderRadius: 10,
  width: 167,
  height: 55,
  boxShadow: '0px 4px 4px #CCE8E4',
};

function NextButton({ children, onClick, loading }) {
  return (
    <Button
      data-testid="next"
      loading={loading}
      onClick={onClick}
      style={styles}
    >
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
  loading: PropTypes.bool,
};

NextButton.defaultProps = {
  loading: false,
};

export default NextButton;
