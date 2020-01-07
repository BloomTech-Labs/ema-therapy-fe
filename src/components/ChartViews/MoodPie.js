/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PieLegend from './PieLegend';

const MoodPie = ({ totalMoods }) => {
  const moodsPercentageArray = [];
  totalMoods.map((item) => {
    moodsPercentageArray.push(item.percent);
    return moodsPercentageArray;
  });

  const data = {
    labels: ['happy', 'fine', 'normal', 'sad', 'unhappy'],
    datasets: [
      {
        data: moodsPercentageArray,
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
    cutoutPercentage: 85,
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        fontColor: '#333',
        usePointStyle: true,
      },
    },
  };

  return (
    <div>
      <PieChartH2>Frequent Moods</PieChartH2>
      <Pie data={data} options={options} />
      <PieLegend totalMoods={totalMoods} />
    </div>
  );
};

const PieChartH2 = styled.div`
  height: 19px;
  margin-left: 9px;
  margin-bottom: 19px;

  font-family: Fira Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  color: #0c423b;
`;

MoodPie.propTypes = {
  totalMoods: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      mood: PropTypes.string,
      percent: PropTypes.number,
    }),
  ).isRequired,
};

export default MoodPie;
