import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styled from 'styled-components';
import styles from '../styles/theme';

const LoadingSpinner = ({ delay, height, margin }) => {
  return (
    <LoadingWrapper height={height} margin={margin}>
      <Spin size="large" delay={delay} />
    </LoadingWrapper>
  );
};

LoadingSpinner.propTypes = {
  delay: PropTypes.number,
  height: PropTypes.string,
  margin: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  delay: 300,
  height: 'inherit',
  margin: 0,
};

export default LoadingSpinner;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};

  .ant-spin-dot-item {
    background-color: ${styles.darkJungleGreen} !important;
  }
`;
