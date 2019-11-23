import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { useAuth0 } from '../utils/react-auth0-spa';
import weekOfMoods from '../utils/weekOfMoods';
import MoodPreview from './MoodPreview';

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

  const [moodsByWeek, setMoodsByWeek] = useState(null);

  useEffect(() => {
    if (data) {
      setMoodsByWeek(weekOfMoods(data.user.moods));
    }
  }, [data]);

  console.log(moodsByWeek);
  if (error) return <p>Error</p>;
  return (
    <>
      {moodsByWeek &&
        moodsByWeek.map((list, index) => {
          if (list.length !== 0) {
            return (
              <MoodPreview
                key={list[index]}
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
