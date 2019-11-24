import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import activities from '../utils/Activities';

const Activities = () => {
  const [type, setType] = useState('food');

  const handleTypeView = (view) => {
    setType(view);
  };
  console.log(activities);
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
      <div>
        {type === 'food' &&
          activities[0].foods.map((food) => {
            return (
              <>
                <button type="button">
                  <Icon icon={food.icon} />
                  <p>{food.foodType}</p>
                </button>
              </>
            );
          })}
        {type === 'drink' &&
          activities[1].drinks.map((drink) => {
            return <button type="button">{drink.drinkType}</button>;
          })}
        {type === 'fun' &&
          activities[2].funs.map((fun) => {
            return <button type="button">{fun.funType}</button>;
          })}
        {type === 'misc' &&
          activities[3].miscs.map((misc) => {
            return <button type="button">{misc.miscType}</button>;
          })}
        {type === 'leisure' &&
          activities[4].leisures.map((leisure) => {
            return <button type="button">{leisure.leisureType}</button>;
          })}
      </div>
    </ActivitiesWrapper>
  );
};

const ActivitiesWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
`;

const ActivityButton = styled.button`
  color: red;
`;

export default Activities;
