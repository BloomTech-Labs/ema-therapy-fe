import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Button, Modal } from 'antd';
import moodToString from '../utils/moodToString';
import Card from './Card';
import styles from '../styles/theme';
import DayActivityTag from './DayActivityTag';
import formatDate from '../utils/formatDate';

const { confirm } = Modal;

const MoodCard = ({
  mood: m,
  deleteMood,
  deleteLoading,
  editMood,
  isEditing,
}) => {
  const {
    activities,
    mood,
    sleep,
    anxietyLevel: anxiety,
    text,
    createdAt,
    weather,
    id,
  } = m;

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this mood entry?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteMood(id);
      },
    });
  };

  return (
    <StyledMoodCard>
      <div className="date-time">
        <p className="date">{formatDate(createdAt, 'iiii d MMMM')}</p>
        <p className="time">{formatDate(createdAt, 'h:mm a')}</p>
      </div>
      <p className="mood">{moodToString(mood)}</p>
      {activities.length > 0 && (
        <div className="activities-list">
          {activities.map((activity) => {
            return <DayActivityTag activityType={activity} key={activity} />;
          })}
        </div>
      )}
      <div className="mood-details">
        {(anxiety || sleep || weather) && (
          <div className="stat-wrapper">
            {anxiety !== null && (
              <div>
                <p className="anxiety">Anxiety</p>
                <p className="counter">{anxiety}</p>
              </div>
            )}
            {sleep !== null && (
              <div>
                <p className="sleep">Sleep</p>
                <p className="counter">{`${sleep}h`}</p>
              </div>
            )}
            {weather && (
              <div>
                <p className="weather">Weather</p>
                <p className="counter">{weather}</p>
              </div>
            )}
          </div>
        )}
        {text && <p className="text">{text}</p>}
      </div>
      <div className="icons">
        <Button shape="circle" onClick={() => editMood(m)} disabled={isEditing}>
          <Icon type="edit" />
        </Button>
        <Button
          shape="circle"
          onClick={() => showDeleteConfirm()}
          disabled={deleteLoading}
        >
          <Icon type="delete" />
        </Button>
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
  deleteMood: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
  editMood: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default MoodCard;

const StyledMoodCard = styled(Card)`
  margin: 0 7px 23px;
  box-shadow: 0px 0px 15px #E5E5E5;
  padding: 0 8px;
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

  .activities-list {
      margin: 0 auto;
      display:flex;
      max-width: 400px;
      flex-wrap: wrap;
      padding: 0 15px 10px;
      justify-content: center;
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

  .icons {
    padding: 10px 25px 20px;
    text-align: right;

    .ant-btn {
      margin: 0 6px;
    }

    .anticon{
      color: ${styles.darkJungleGreen};
      font-size: 18px;
    }
  }

  /* Styles for location -- uncomment if added */
  /* .location {
    text-align: right;
    font-size: 10px;
    color: ${styles.darkJungleGreen};
    padding: 0px 25px 15px 0px;
  } */
`;
