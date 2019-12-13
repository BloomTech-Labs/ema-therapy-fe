/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const MoodPie = ({ arrayOfDays }) => {
  const findMoodPercent = (moodData) => {
    const moodArray = [0, 0, 0, 0, 0];
    moodData.map((entry) => {
      switch (entry.mood) {
        case 'happy':
          moodArray[0] += 1;
          break;
        case 'fine':
          moodArray[1] += 1;
          break;
        case 'normal':
          moodArray[2] += 1;
          break;
        case 'sad':
          moodArray[3] += 1;
          break;
        case 'unhappy':
          moodArray[4] += 1;
          break;

        default:
          return 1;
      }
    });
    return moodArray;
  };
  const totalMoodPercent = findMoodPercent(arrayOfDays);

  const data = {
    labels: ['happy', 'fine', 'normal', 'sad', 'unhappy'],
    datasets: [
      {
        data: totalMoodPercent,
        backgroundColor: [
          '#00917A',
          '#53BBC9',
          '#FCD783',
          '#F2812E',
          '#F47979',
        ],
        hoverBackgroundColor: [
          '#00917A',
          '#53BBC9',
          '#FCD783',
          '#F2812E',
          '#F47979',
        ],
      },
    ],
  };
  const options = {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#333',
        usePointStyle: true,
      },
    },
  };

  return (
    <div>
      <h2>Frequent Moods</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

MoodPie.propTypes = {
  arrayOfDays: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.string,
      anxietyLevel: PropTypes.number,
      sleep: PropTypes.number,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
};

export default MoodPie;
