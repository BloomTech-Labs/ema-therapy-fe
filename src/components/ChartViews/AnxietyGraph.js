// takes getArrayOfDays from chart views and gets anxietyLevel
import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function AnxietyGraph({ arrayOfDays }) {
  const dataForGraph = {
    datasets: [
      {
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgb(227, 113, 128)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(227, 113, 128)',
        pointBackgroundColor: 'rgb(227, 113, 128)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(227, 113, 128)',
        pointHoverBorderColor: 'rgb(227, 113, 128)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: arrayOfDays.map((day) => {
          return day.anxietyLevel;
        }),
      },
    ],
  };

  const options = {
    legend: false,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: 'rgb(0,145,122)',
          },
          gridLines: {
            color: 'rgba(0,0,0,0)',
            drawBorder: false,
            display: false,
          },
          display: true,
          type: 'category',
          labels: arrayOfDays.map((day) => {
            return day.createdAt;
          }),
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: 'rgb(0,145,122)',
          },
          gridLines: {
            color: 'rgba(0,0,0,0)',
            drawBorder: false,
            display: false,
          },
          display: true,
          type: 'category',
          labels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        },
      ],
    },
  };
  return (
    <div>
      <h2>Week Anxiety</h2>
      <Line data={dataForGraph} options={options} />
    </div>
  );
}

export default AnxietyGraph;
