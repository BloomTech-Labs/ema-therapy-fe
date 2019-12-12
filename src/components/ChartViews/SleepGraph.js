// takes getArrayOfDays from chart views and gets sleep
import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function SleepGraph({ arrayOfDays }) {
  const dataForGraph = {
    datasets: [
      {
        label: 'Sleep',
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
        data: arrayOfDays.map((day) => {
          return day.sleep;
        }),
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          display: true,
          type: 'category',
          labels: arrayOfDays.map((day) => {
            return day.createdAt;
          }),
        },
      ],
      yAxes: [
        {
          display: true,
          type: 'category',
          labels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        },
      ],
    },
  };
  return (
    <div>
      <h2>Week Sleep</h2>
      <Line data={dataForGraph} options={options} />
    </div>
  );
}

export default SleepGraph;
