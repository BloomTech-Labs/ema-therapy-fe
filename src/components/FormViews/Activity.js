import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MyTag from './MyTag';

const Activity = ({ activityType, addActivities }) => {
  const handleActiveAndAddActivity = (addedActivity) => {
    addActivities(addedActivity);
  };
  return (
    <>
      <ActivityButtonToggle>
        <MyTag>{activityType}</MyTag>
      </ActivityButtonToggle>
    </>
  );
};

Activity.propTypes = {
  activityType: PropTypes.string.isRequired,
  addActivities: PropTypes.func.isRequired,
};

const ActivityButtonToggle = styled.div`
  display: inline-block;

  .ant-tag {
    padding: 5px;
    margin-left: 18px;
    margin-top: 27px;
    outline: none;
    padding: 9px 8px;
    border-radius: 9px;
    font-family: Fira Sans;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
`;

export default Activity;
