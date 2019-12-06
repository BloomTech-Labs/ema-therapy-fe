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
        <p className="date">{formatDate(createdAt, 'iii LLL d')}</p>
        <p className="time">{formatDate(createdAt, 'h:mm a')}</p>
      </div>
      <p className="mood">{moodToString(mood)}</p>
      <div className="mood-details">
        {weather && <p className="weather">Weather: {weather}</p>}
        {sleep !== null && <p className="sleep">Sleep: {sleep} h</p>}
        {anxiety !== null && (
          <p className="anxiety">Anxiety Level: {anxiety}</p>
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
  padding: 25px;
  margin-bottom: 23px;

  .date-time {
    display: flex;
    justify-content: space-between;

    .date,
    .time {
      margin: 0;
      font-size: 14px;
      line-height: 18px;
      color: ${styles.brightYellow};
    }
  }

  .mood {
    text-align: center;
    margin: 10px;
    text-transform: capitalize;
    font-size: 18px;
    line-height: 20px;
    color: ${styles.darkJungleGreen};
    font-weight: 500;
  }

  .mood-details {
    font-size: 14px;
    line-height: 18px;

    p:not(.text) {
      margin: 0 0 4px;
    }

    .text {
      margin-top: 10px;
      font-weight: 600;
    }
  }
`;
