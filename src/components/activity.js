import React, { useState } from 'react';
import styled from 'styled-components';
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
        <Icon icon={activityType.icon} />
        <p>{activityType.type}</p>
      </ActivityButtonToggle>
    </>
  );
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
