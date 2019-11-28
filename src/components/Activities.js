import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import activities from '../utils/Activities';
import Activity from './Activity';

const Activities = ({ addActivities }) => {
  const [type, setType] = useState('food');

  const handleTypeView = (view) => {
    setType(view);
  };
  return (
    <ActivitiesWrapper>
      <div>
        {activities.map((cur) => {
          return (
            <TypeButton onClick={() => handleTypeView(cur.name)} type="button">
              {cur.name}
            </TypeButton>
          );
        })}
      </div>
      <ActivitiesView>
        {type === 'food' &&
          activities[0].foods.map((activityType) => {
            return (
              // TODO: add unique key prop
              <Activity
                activityType={activityType}
                addActivities={addActivities}
              />
            );
          })}
        {type === 'drink' &&
          activities[1].drinks.map((activityType) => {
            return (
              // TODO: add unique key prop
              <Activity
                activityType={activityType}
                addActivities={addActivities}
              />
            );
          })}
        {type === 'fun' &&
          activities[2].funs.map((activityType) => {
            return (
              // TODO: add unique key prop
              <Activity
                activityType={activityType}
                addActivities={addActivities}
              />
            );
          })}
        {type === 'misc' &&
          activities[3].miscs.map((activityType) => {
            return (
              // TODO: add unique key prop
              <Activity
                activityType={activityType}
                addActivities={addActivities}
              />
            );
          })}
        {type === 'leisure' &&
          activities[4].leisures.map((activityType) => {
            return (
              // TODO: add unique key prop
              <Activity
                activityType={activityType}
                addActivities={addActivities}
              />
            );
          })}
      </ActivitiesView>
    </ActivitiesWrapper>
  );
};

Activities.propTypes = {
  addActivities: PropTypes.func.isRequired,
};

const ActivitiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  margin: 0 auto;
`;

const ActivitiesView = styled.div`
  margin-left: 15px;
`;

const TypeButton = styled.button`
  width: 62px;
  height: 16px;
  background: #c4c4c4;
  border-radius: 2px;
  margin-right: 9px;
  align-items: center;
  font-family: Muli;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  margin-top: 50px;
`;

export default Activities;
