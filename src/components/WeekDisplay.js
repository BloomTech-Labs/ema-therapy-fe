import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getDay } from 'date-fns';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { useAuth0 } from '../utils/react-auth0-spa';
import weekOfMoods from '../utils/weekOfMoods';
import MoodPreview from './MoodPreview';
import { MoodsPrevWeekContext } from '../contexts/MoodsPrevWeekContext';

function WeekDisplay() {
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      sub: user.sub,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
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
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Greeting>Here you are, {user.given_name}!</Greeting>
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
  margin-bottom: 60px;
`;
