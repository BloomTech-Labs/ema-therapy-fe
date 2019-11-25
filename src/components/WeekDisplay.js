import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
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

  const moodsPrevWeek = useContext(MoodsPrevWeekContext);

  // set moodsByWeek state if the data from query exists
  useEffect(() => {
    if (data) {
      // setMoodsByWeek(weekOfMoods(data.user.moods));
      moodsPrevWeek.setMoods(weekOfMoods(data.user.moods));
    }
  }, [data]);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      {moodsPrevWeek.moods &&
        moodsPrevWeek.moods.map((list) => {
          // return mood preview card if mood entries exist in the list
          if (list.length !== 0) {
            return (
              <MoodPreview
                key={list[0].id}
                count={list.length}
                lastItem={list[list.length - 1]}
              />
            );
          }
          return null;
        })}
    </>
  );
}

export default WeekDisplay;
