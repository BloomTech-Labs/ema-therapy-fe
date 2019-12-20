import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styled from 'styled-components';
import styles from '../styles/theme';

const LoadingSpinner = ({ delay, height }) => {
  return (
    <LoadingWrapper height={height}>
      <Spin size="large" delay={delay} />
    </LoadingWrapper>
  );
};

LoadingSpinner.propTypes = {
  delay: PropTypes.number,
  height: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  delay: 300,
  height: 'inherit',
};

export default LoadingSpinner;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};

  .ant-spin-dot-item {
    background-color: ${styles.darkJungleGreen} !important;
  }
`;
