import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getDay } from 'date-fns';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { useAuth } from '../utils/dataStore';
import weekOfMoods from '../utils/weekOfMoods';
import MoodPreview from './MoodPreview';
import { MoodsPrevWeekContext } from '../contexts/MoodsPrevWeekContext';
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
