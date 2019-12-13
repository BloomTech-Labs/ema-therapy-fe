import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function MoodGraph({ arrayOfDays }) {
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
          return day.mood;
        }),
      },
    ],
  };

  const options = {
    // tooltips: {
    //   backgroundColor: 'rgba(0,0,0,0)',
    //   titleFontColor: 'rgb(227, 113, 128)',
    //   color: 'rgb(227, 113, 128)',
    // },
    legend: false,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: 'rgb(0,145,122)',
            padding: 15,
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
            padding: 10,
          },
          gridLines: {
            color: 'rgba(0,0,0,0)',
            drawBorder: false,
            display: false,
          },
          display: true,
          type: 'category',
          labels: ['happy', 'fine', 'normal', 'sad', 'unhappy'],
        },
      ],
    },
  };
  return (
    <div>
      <h2>Mood Chart</h2>
      <GraphWrapper>
        <Line data={dataForGraph} options={options} />
      </GraphWrapper>
    </div>
  );
}

const GraphWrapper = styled.div`
  background-color: white;
  padding: 20px 5px;
  border-radius: 10px;
`;
MoodGraph.propTypes = {
  arrayOfDays: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.string,
      anxietyLevel: PropTypes.number,
      sleep: PropTypes.number,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
};
export default MoodGraph;
