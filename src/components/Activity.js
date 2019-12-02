import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Activity = ({ activityType, addActivities }) => {
  const [active, setActive] = useState(true);

  const handleActiveAndAddActivity = (addedActivity) => {
    addActivities(addedActivity);
    setActive(!active);
  };
  return (
    <>
      <ActivityButtonToggle
        active={active}
        type="button"
        onClick={() => handleActiveAndAddActivity(activityType)}
      >
        <Icon icon={activityType} />
        <p>{activityType}</p>
      </ActivityButtonToggle>
    </>
  );
};

Activity.propTypes = {
  activityType: PropTypes.shape({
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  addActivities: PropTypes.func.isRequired,
};

const ActivityButton = styled.button`
  padding: 5px;
  width: 70px;
  border: none;
  background: none;
  margin-right: 3px;
  margin-top: 27px;
`;

const ActivityButtonToggle = styled(ActivityButton)`
  color: ${(props) => (props.active ? 'limegreen' : 'darkred')};
`;

export default Activity;
