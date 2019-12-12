import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import { useQuery } from '@apollo/react-hooks';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import moodToString from '../../utils/moodToString';
import weekOfMoods from '../../utils/weekOfMoods';
import { useAuth0 } from '../../utils/react-auth0-spa';
import MoodGraph from './MoodGraph';

const ChartViews = () => {
  // query for user data

  const { user } = useAuth0();
  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      sub: user.sub,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const formatDate = (timestamp, fmt) => {
    const ts = Number(timestamp);
    return format(new Date(ts), fmt);
  };

  //  parent component for multiple chart views
  //  get moods to pass down to different graphs

  const [moods, setMoods] = useState([]);

  useEffect(() => {
    if (data) {
      setMoods(weekOfMoods(data.user.moods));
    }
  }, [data]);

  // function for utils to collect days and averages for days
  const arrayOfDays = [];
  let finalDay = {
    createdAt: '',
    mood: 0,
    anxietyLevel: 0,
    sleep: 0,
  };

  let numberOfEntries = 1;

  // eslint-disable-next-line array-callback-return
  moods.map((day) => {
    // eslint-disable-next-line array-callback-return
    day.map(
      (mood) => {
        numberOfEntries += 1;

        finalDay.createdAt = formatDate(mood.createdAt, 'iii');
        finalDay.mood += mood.mood;
        finalDay.anxietyLevel += mood.anxietyLevel;
        finalDay.sleep += mood.sleep;
      },
      arrayOfDays.push({
        ...finalDay,
        mood: moodToString(Math.round(finalDay.mood / numberOfEntries)),
        anxietyLevel: Math.round(finalDay.anxietyLevel / numberOfEntries),
      }),
      (numberOfEntries = 0),
      (finalDay = {
        createdAt: '',
        mood: 0,
        anxietyLevel: 0,
        sleep: 0,
      }),
    );
  });

  if (error) return <p>{error.message}</p>;

  return loading ? null : (
    <div>
      <MoodGraph arrayOfDays={arrayOfDays.filter((day) => day.mood)} />
    </div>
  );
};

export default ChartViews;
