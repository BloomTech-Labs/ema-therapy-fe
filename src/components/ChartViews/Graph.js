import React, { useContext, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@apollo/react-hooks';
import { checkForUserAndGetMoodsQuery } from '../../queries';

import moodToString from '../../utils/moodToString';
import { MoodsPrevWeekContext } from '../../contexts/MoodsPrevWeekContext';
import weekOfMoods from '../../utils/weekOfMoods';
import { useAuth0 } from '../../utils/react-auth0-spa';

//  create util to get mood average

// mood to string and use to plot data

// make sure x axis takes the number of inputs and plots over them 1-7

const dataForGraph = {
  datasets: [
    {
      label: 'Mood',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: ['happy', 'sad', 'normal', 'good', 'good', 'unhappy', 'happy'],
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        display: true,
        type: 'category',
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
      },
    ],
    yAxes: [
      {
        display: true,
        type: 'category',
        labels: ['happy', 'good', 'normal', 'sad', 'unhappy'],
      },
    ],
  },
};

function Graph() {
  // get user
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

  return loading ? null : (
    <div>
      {console.log(moods)}
      <h2>Week Mood</h2>
      <Line data={dataForGraph} options={options} />
    </div>
  );
}

export default Graph;
