import React, { useEffect, useState } from 'react';
import { getDay } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MoodPreview from './MoodPreview';
import styles from '../styles/theme';
import CalendarIcon from '../containers/Moods/CalendarIcon';
import getMoodsThisWeek from '../utils/weekOfMoods';

function WeekDisplay({ moods, handleMoodsToDisplay, handleTasksToDisplay }) {
  const [moodsThisWeek, setMoodsThisWeek] = useState(null);

  useEffect(() => {
    // filters for only the moods from the past week
    if (moods) setMoodsThisWeek(getMoodsThisWeek(moods));
  }, [moods]);

  const getMoodsByDay = (day) => {
    for (let i = 0; i < moodsThisWeek.length; i += 1) {
      if (
        moodsThisWeek[i].length > 0 &&
        day === getDay(+moodsThisWeek[i][0].createdAt)
      ) {
        handleMoodsToDisplay(moodsThisWeek[i]);
        break;
      }
    }
  };

  return (
    <>
      <Header>
        <StyledLogo>MoodBloom</StyledLogo>
        <Link to="/dashboard/calendar">
          <CalendarIcon />
        </Link>
      </Header>
      <Greeting>Your weekly moods</Greeting>
      {moodsThisWeek &&
        moodsThisWeek.map((list) => {
          // return mood preview card if mood entries exist in the list
          if (list.length !== 0) {
            return (
              <Link
                to="/dashboard/day"
                key={list[0].id}
                onClick={() => {
                  getMoodsByDay(getDay(+list[0].createdAt));
                  handleTasksToDisplay(+list[0].createdAt);
                }}
              >
                <MoodPreview
                  count={list.length}
                  lastItem={list[list.length - 1]}
                />
              </Link>
            );
          }
          return null;
        })}
    </>
  );
}

WeekDisplay.propTypes = {
  moods: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      anxietyLevel: PropTypes.number,
      text: PropTypes.string,
      sleep: PropTypes.number,
      weather: PropTypes.string,
    }),
  ),
  handleMoodsToDisplay: PropTypes.func.isRequired,
  handleTasksToDisplay: PropTypes.func.isRequired,
};

WeekDisplay.defaultProps = {
  moods: null,
};

export default WeekDisplay;

const Greeting = styled.h2`
  color: ${styles.darkJungleGreen};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 30px;
`;

const StyledLogo = styled.h1`
  font-size: 21px;
  font-weight: 600;
  color: #0c423b;
  margin: unset;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
`;
