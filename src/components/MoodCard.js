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
        <div className="sleep-anxiety-wrapper">
          {anxiety !== null && (
            <div>
              <p className="sleep-anxiety">ANXIETY</p>
              <p className="counter">{anxiety} out of 10</p>
            </div>
          )}
          {sleep !== null && (
            <div>
              <p className="sleep-anxiety">SLEEP</p>
              <p className="counter">{sleep} hours</p>
            </div>
          )}
        </div>
        {text && <p className="text">{text}</p>}
        {weather && (
          <div>
            <p className="weather">Weather: {weather} </p>
          </div>
        )}
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
      font-size: 14px;
      line-height: 18px;
      color: ${styles.brightYellow};
    }

    .time {
      margin-right: 15px;
      font-weight: 300;
    }

    .date {
      color: ${styles.tealGreen};
    }
  }

  .mood {
    text-align: center;
    margin: 15px 0px 30px 0px;
    text-transform: capitalize;
    font-size: 18px;
    line-height: 20px;
    color: ${styles.darkJungleGreen};
    font-weight: 500;
  }

  .mood-details {
    font-size: 14px;
    line-height: 18px;

    .sleep-anxiety-wrapper {
      display: flex;
      justify-content: space-evenly;
      text-align: center;

      p {
        margin: 0 0 4px;
      }

      .sleep-anxiety {
        font-size: 11px;
        border-bottom: 1px solid ${styles.darkJungleGreen};
        color: ${styles.darkJungleGreen};
      }

      .counter {
        font-size: 10px;
        color: #658883;
      }
    }

    .text {
      margin: 10px 0 0;
      padding: 0px 25px 20px;
      font-size: 11px;
      color: #658883;
      line-height: 20px;
    }

    .weather {
      text-align: right;
      font-size: 10px;
      color: ${styles.brightYellow};
      padding: 0px 25px 15px 0px;
    }
  }
`;
