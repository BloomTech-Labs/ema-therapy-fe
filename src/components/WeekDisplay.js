import React from 'react';
import { getDay } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MoodPreview from './MoodPreview';
import styles from '../styles/theme';

function WeekDisplay({ moods, handleCurrentDay }) {
  return (
    <>
      <StyledLogo>MoodBloom</StyledLogo>
      <Greeting>Weekly moods</Greeting>
      {moods &&
        moods.map((list) => {
          // return mood preview card if mood entries exist in the list
          if (list.length !== 0) {
            return (
              <Link
                to="/dashboard/day"
                key={list[0].id}
                onClick={() => handleCurrentDay(getDay(+list[0].createdAt))}
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
    PropTypes.arrayOf(
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
  ),
  handleCurrentDay: PropTypes.func.isRequired,
};

WeekDisplay.defaultProps = {
  moods: null,
};

export default WeekDisplay;

const Greeting = styled.h2`
  color: ${styles.rosyPink};
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 30px;
`;

const StyledLogo = styled.h1`
  font-size: 21px;
  font-weight: 600;
  color: #0c423b;
  margin: unset;
  margin-bottom: 31px;
`;
