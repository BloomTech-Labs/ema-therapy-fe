import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import moodToString from '../utils/moodToString';
import Card from './Card';
import styles from '../styles/theme';

const formatDate = (timestamp, fmt) => {
  const ts = Number(timestamp);
  return format(new Date(ts), fmt);
};

const MoodCard = ({ mood: m }) => {
  const { mood, sleep, anxietyLevel: anxiety, text, createdAt, weather } = m;
  return (
    <StyledMoodCard>
      <div className="date-time">
        <p className="date">{formatDate(createdAt, 'iiii d MMMM')}</p>
        <p className="time">{formatDate(createdAt, 'h:mm a')}</p>
      </div>
      <p className="mood">{moodToString(mood)}</p>
      <div className="mood-details">
        {(anxiety || sleep || weather) && (
          <div className="stat-wrapper">
            {anxiety !== null && (
              <div>
                <p className="anxiety">ANXIETY</p>
                <p className="counter">{anxiety} out of 10</p>
              </div>
            )}
            {sleep !== null && (
              <div>
                <p className="sleep">SLEEP</p>
                <p className="counter">
                  {sleep === 1 ? `${sleep} hour` : `${sleep} hours`}
                </p>
              </div>
            )}
            {weather && (
              <div>
                <p className="weather">WEATHER</p>
                <p className="counter">{weather}</p>
              </div>
            )}
          </div>
        )}
        {text && <p className="text">{text}</p>}
      </div>
    </StyledMoodCard>
  );
};

MoodCard.propTypes = {
  mood: PropTypes.shape({
    mood: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    anxietyLevel: PropTypes.number,
    text: PropTypes.string,
    sleep: PropTypes.number,
    weather: PropTypes.string,
  }).isRequired,
};

export default MoodCard;

const StyledMoodCard = styled(Card)`
  margin: 0 7px 23px;

  p {
    margin: unset;
  }

  .date-time {
    display: flex;
    justify-content: space-between;
    padding: 15px 12px 11px;
    border-bottom: 1px solid #f0f8f7;

    .date,
    .time {
      margin: 0;
      font-size: 12px;
    }

    .time {
      color: ${styles.darkJungleGreen};
      margin-right: 15px;
      font-weight: 300;
    }

    .date {
      color: ${styles.tealGreen};
    }
  }

  .mood {
    text-align: center;
    padding: 15px 0 25px;
    text-transform: capitalize;
    font-size: 24px;
    color: ${styles.darkJungleGreen};
    font-weight: 500;

  }

  .stat-wrapper {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    padding-bottom: 15px;

    p {
      margin: 0 0 4px;
    }

    .sleep, .anxiety, .weather {
      font-size: 14px;
      border-bottom: 1px solid ${styles.darkJungleGreen};
      color: ${styles.darkJungleGreen};
    }

    .counter {
      font-size: 12px;
      color: #658883;
    }

  }
  .text {
    padding: 0px 25px 15px;
    font-size: 13px;
    color: #658883;
    line-height: 20px;
  }

  /* Styles for location -- uncomment if added */
  /* .location {
    text-align: right;
    font-size: 10px;
    color: ${styles.darkJungleGreen};
    padding: 0px 25px 15px 0px;
  } */
`;
