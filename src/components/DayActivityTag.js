/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import styled from 'styled-components';
import styles from '../styles/theme';

const DayActivityTag = ({ activityType }) => {
  return (
    <Wrapper>
      <Tag>{activityType}</Tag>
    </Wrapper>
  );
};

DayActivityTag.propTypes = {
  activityType: PropTypes.string.isRequired,
};
const Wrapper = styled.div`
  .ant-tag {
    background: rgba(0, 145, 122, 0.05);
    border-radius: 16px;
    font-size: 14px;
    color: ${styles.tealGreen};
    border: none;
    height: 32px;
    padding: 7px 16px;
    margin-bottom: 15px;
  }
`;
export default DayActivityTag;
