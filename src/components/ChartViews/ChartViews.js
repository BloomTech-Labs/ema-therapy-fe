import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import ReactSwipe from 'react-swipe';
import { useQuery } from '@apollo/react-hooks';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import moodToString from '../../utils/moodToString';
import weekOfMoods from '../../utils/weekOfMoods';
import { useAuth0 } from '../../utils/react-auth0-spa';
import MoodGraph from './MoodGraph';
import AnxietyGraph from './AnxietyGraph';
import SleepGraph from './SleepGraph';

const ChartViews = () => {
  let reactSwipeEl;
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

  const getArrayOfDays = (moodData) => {
    const arrayOfDays = moods.map((day) => {
      let numberOfEntries = 0;
      const finalDay = {
        createdAt: '',
        mood: 0,
        anxietyLevel: 0,
        sleep: 0,
      };
      // eslint-disable-next-line array-callback-return
      day.map((entry) => {
        numberOfEntries += 1;
        finalDay.createdAt = formatDate(entry.createdAt, 'iii');
        finalDay.mood += entry.mood;
        finalDay.anxietyLevel += entry.anxietyLevel;
        finalDay.sleep += entry.sleep;
      });

      return {
        ...finalDay,
        mood: moodToString(Math.round(finalDay.mood / numberOfEntries)),
        anxietyLevel: Math.round(finalDay.anxietyLevel / numberOfEntries),
      };
    });
    return arrayOfDays.filter((day) => day.mood).reverse();
  };

  if (error) return <p>{error.message}</p>;

  return loading ? null : (
    <div>
      <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: false }}
        ref={(el) => (reactSwipeEl = el)}
      >
        <div>
          <MoodGraph arrayOfDays={getArrayOfDays(moods)} />
        </div>
        <div>
          <AnxietyGraph arrayOfDays={getArrayOfDays(moods)} />
        </div>
        <div>
          <SleepGraph arrayOfDays={getArrayOfDays(moods)} />
        </div>
      </ReactSwipe>
      <button onClick={() => reactSwipeEl.next()}>Next</button>
      <button onClick={() => reactSwipeEl.prev()}>Previous</button>
    </div>
  );
};

export default ChartViews;
