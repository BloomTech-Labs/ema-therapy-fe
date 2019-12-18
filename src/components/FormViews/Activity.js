import React, { useState } from 'react';
import { Tag } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MyTag from './MyTag';
import EditableTagGroup from './EditableTag';

const Activity = ({ activityType, addActivities }) => {
  const handleActiveAndAddActivity = (addedActivity) => {
    addActivities(addedActivity);
  };
  return (
    <>
      <ActivityButtonToggle>
        <MyTag>{activityType}</MyTag>
        <EditableTagGroup />
      </ActivityButtonToggle>
    </>
  );
};
// data-testid="toggle"

Activity.propTypes = {
  activityType: PropTypes.string.isRequired,
  addActivities: PropTypes.func.isRequired,
};

const ActivityButtonToggle = styled.div`
  display: inline-block;

  .ant-tag {
    padding: 5px;
    width: 70px;

    margin-right: 3px;
    margin-top: 27px;
    outline: none;
    padding: 9px 8px;

    border-radius: 9px;
    font-family: Fira Sans;
    font-size: 14px;
    line-height: 20px;
    /* background-color:#f4faf9; */
    text-align: center;
  }
`;

export default Activity;
