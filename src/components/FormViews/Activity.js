import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ActivityTag from './ActivityTag';

const Activity = ({ activityType, addActivities, isSelectedForEdit }) => {
  return (
    <>
      <ActivityButtonToggle>
        <ActivityTag
          isSelectedForEdit={isSelectedForEdit}
          activityType={activityType}
          addActivities={addActivities}
        >
          {activityType}
        </ActivityTag>
      </ActivityButtonToggle>
    </>
  );
};

Activity.propTypes = {
  activityType: PropTypes.string.isRequired,
  addActivities: PropTypes.func.isRequired,
  isSelectedForEdit: PropTypes.bool.isRequired,
};

const ActivityButtonToggle = styled.div`
  display: inline-block;
`;

export default Activity;
