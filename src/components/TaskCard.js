import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';
import styles from '../styles/theme';

const TaskCard = ({ task }) => {
  return (
    <StyledTaskCard>
      <p>Prompt: {task.prompt}</p>
      <p>Text: {task.text}</p>
      <img src={task.photoUrl} alt="" />
    </StyledTaskCard>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    completedAt: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    text: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
};

export default TaskCard;

const StyledTaskCard = styled(Card)`
  margin: 0 7px 23px;
  box-shadow: 0px 0px 15px #e5e5e5;

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
`;
