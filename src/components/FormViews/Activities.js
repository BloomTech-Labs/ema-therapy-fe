/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSwipe from 'react-swipe';
import { Icon } from 'antd';
import styled from 'styled-components';
import { activities, categories } from '../../utils/Activities';
import Activity from './Activity';
import NextButton from './NextButton';
import DoneButton from './DoneButton';

const Activities = ({
  addActivities,
  handleView,
  isSubmitting,
  handleSubmit,
}) => {
  const [type, setType] = useState('food');

  let reactSwipeEl;
  const handleTypeView = (view) => {
    setType(view);
  };
  return (
    <>
      <div className="header">
        <Icon
          type="left"
          data-testid="back"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => handleView('mood')}
        />
        <p>
          What have you
          <br />
          been up to?
        </p>
        <DoneButton loading={isSubmitting} onClick={handleSubmit}>
          Done
        </DoneButton>
      </div>
      <InputWrapper>
        <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: false }}
          // eslint-disable-next-line no-return-assign
          ref={(el) => (reactSwipeEl = el)}
        >
          {categories.map((arr) => {
            return (
              <div key={arr[0]}>
                {arr.map((category) => {
                  return (
                    <TypeButton
                      key={category}
                      onClick={() => handleTypeView(category)}
                      type="button"
                      active={type === category}
                    >
                      {category}
                    </TypeButton>
                  );
                })}
              </div>
            );
          })}
        </ReactSwipe>
        <ActivitiesWrapper>
          {activities[type].map((activityType) => {
            return (
              <Activity
                key={activityType}
                activityType={activityType}
                addActivities={addActivities}
              />
            );
          })}
        </ActivitiesWrapper>
      </InputWrapper>
      <div className="footer">
        <NextButton
          data-testid="next"
          onClick={() => handleView('activity-journal')}
        >
          Next
        </NextButton>
      </div>
    </>
  );
};

Activities.propTypes = {
  addActivities: PropTypes.func.isRequired,
  handleView: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 100px; */

  .carousel {
    width: 100%;
  }
`;

const TypeButton = styled.button`
  width: 25%;
  height: 50px;
  align-items: center;
  border: none;
  border-bottom: 2px solid #595959;
  background-color: #fafdfc;
  font-family: Fira Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  outline: none;
  color: #595959;
  font-weight: ${(props) => (props.active ? '600' : 'normal')};
  border-bottom: ${(props) =>
    props.active ? '2px solid #595959' : '1.5px solid lightgrey'};
  &:first-of-type {
    margin-bottom: 30px;
  }
`;

const ActivitiesWrapper = styled.div`
  min-height: 400px;
`;

export default Activities;
