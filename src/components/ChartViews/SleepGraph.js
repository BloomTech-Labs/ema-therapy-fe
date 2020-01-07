// takes getArrayOfDays from chart views and gets sleep
import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function SleepGraph({ arrayOfDays }) {
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
          return day.sleep;
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
          labels: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        },
      ],
    },
  };
  return (
    <div>
      <SleepChartH2>Sleep</SleepChartH2>
      <GraphWrapper>
        <Line
          data={dataForGraph}
          options={options}
          maintainAspectRatio={false}
          height={200}
        />
      </GraphWrapper>
    </div>
  );
}

const GraphWrapper = styled.div`
  background-color: white;
  padding: 34px 9px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 142, 122, 0.1);
  margin-bottom: 20px;
  margin-right: 16px;
  margin-left: 16px;
`;

const SleepChartH2 = styled.div`
  width: 85px;
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

SleepGraph.propTypes = {
  arrayOfDays: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.string,
      anxietyLevel: PropTypes.number,
      sleep: PropTypes.number,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
};

export default SleepGraph;
