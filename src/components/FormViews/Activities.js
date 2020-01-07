/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSwipe from 'react-swipe';
import { Icon } from 'antd';
import styled from 'styled-components';
import { activities, categories } from '../../utils/Activities';
import Activity from './Activity';
import NextButton from './NextButton';
import Dots from '../ChartViews/Dots';
import styles from '../../styles/theme';

const Activities = ({ addActivities, handleView, activitiesToEdit }) => {
  const [type, setType] = useState('food');

  let reactSwipeEl;
  const handleTypeView = (view) => {
    setType(view);
  };

  const [activeGraph, setActiveGraph] = useState(0);
  const swipeOptions = {
    startSlide: activeGraph,
    auto: 0,
    speed: 300,
    continuous: false,
    widthOfSiblingSlidePreview: 0,
    callback(index) {
      setActiveGraph(index);
    },
  };

  return (
    <>
      <div className="header">
        <Icon
          className="back-btn"
          type="left"
          data-testid="back"
          onClick={() => handleView('anxiety-sleep')}
        />
        <p>
          What have you
          <br />
          been up to?
        </p>
      </div>
      <InputWrapper>
        <ReactSwipe
          className="carousel"
          swipeOptions={swipeOptions}
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
        <Dots activeGraph={activeGraph} />
        <ActivitiesWrapper>
          {activities[type].map((activityType) => {
            return (
              <Activity
                key={activityType}
                activityType={activityType}
                addActivities={addActivities}
                isSelectedForEdit={activitiesToEdit.includes(activityType)}
              />
            );
          })}
        </ActivitiesWrapper>
      </InputWrapper>
      <div className="footer">
        <NextButton data-testid="next" onClick={() => handleView('journal')}>
          Next
        </NextButton>
      </div>
    </>
  );
};

Activities.propTypes = {
  addActivities: PropTypes.func.isRequired,
  handleView: PropTypes.func.isRequired,
  activitiesToEdit: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 22px;
  flex: 1;

  .carousel {
    width: 100%;
  }
`;

const TypeButton = styled.button`
  width: 25%;
  height: 30px;
  align-items: center;
  border: none;
  background-color: #fafdfc;
  font-size: 14px;
  text-align: center;
  outline: none;
  color: ${(props) =>
    props.active ? styles.darkJungleGreen : 'rgba(12, 66, 59, 0.23)'};
  font-weight: 600;
  border-bottom: ${(props) =>
    props.active
      ? `3px solid ${styles.brightYellow}`
      : '3px solid transparent'};
  &:first-of-type {
    margin-bottom: 10px;
  }
  white-space: nowrap;
`;

const ActivitiesWrapper = styled.div`
  /* min-height: 330px; */
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default Activities;
