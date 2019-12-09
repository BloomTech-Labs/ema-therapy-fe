import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getDay } from 'date-fns';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { checkForUserAndGetMoodsQuery } from '../queries';
import weekOfMoods from '../utils/weekOfMoods';
import MoodPreview from './MoodPreview';
import { MoodsPrevWeekContext } from '../contexts/MoodsPrevWeekContext';

function WeekDisplay() {
  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      sub: process.env.REACT_APP_SUB_ID,
      email: process.env.REACT_APP_EMAIL,
      firstName: process.env.REACT_APP_FIRST_NAME,
      lastName: process.env.REACT_APP_LAST_NAME,
    },
  });

  const { moods, setMoods } = useContext(MoodsPrevWeekContext);

  // set moodsPrevWeek context if the data from query exists
  useEffect(() => {
    if (data) {
      setMoods(weekOfMoods(data.user.moods));
    }
  }, [data, setMoods]);

  if (error) return <p>{error.message}</p>;

  return loading ? null : (
    <>
      <Greeting>Here you are! {process.env.REACT_APP_FIRST_NAME}</Greeting>
      {moods &&
        moods.map((list) => {
          // return mood preview card if mood entries exist in the list
          if (list.length !== 0) {
            return (
              <Link
                to={`/dashboard/day/${getDay(+list[0].createdAt)}`}
                key={list[0].id}
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
  color: #00917a;
  font-size: 21px;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 30px;
`;
