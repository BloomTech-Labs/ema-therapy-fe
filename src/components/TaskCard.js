import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Button, Modal } from 'antd';
import Card from './Card';
import styles from '../styles/theme';
import formatDate from '../utils/formatDate';

const TaskCard = ({ task, deleteTask, deleteLoading }) => {
  const { id, completedAt, prompt, text, photoUrl } = task;

  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this task?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteTask(id);
      },
    });
  };

  return (
    <StyledTaskCard>
      <div className="date-time">
        <p className="date">{formatDate(completedAt, 'iiii d MMMM')}</p>
        <p className="time">{formatDate(completedAt, 'h:mm a')}</p>
      </div>
      <div className="card-body">
        <h2 className="prompt">{prompt}</h2>
        {text && <p className="text">{text}</p>}
        {photoUrl && <img className="photo" src={photoUrl} alt="" />}
      </div>
      <div className="icons">
        <Button
          shape="circle"
          onClick={() => showDeleteConfirm()}
          disabled={deleteLoading}
        >
          <Icon type="delete" />
        </Button>
      </div>
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
  deleteTask: PropTypes.func,
  deleteLoading: PropTypes.bool,
};

TaskCard.defaultProps = {
  deleteTask: null,
  deleteLoading: null,
};

export default TaskCard;

const StyledTaskCard = styled(Card)`
  margin: 0 7px 23px;
  box-shadow: 0px 0px 15px #e5e5e5;
  padding: 0 8px;

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

  .card-body {
    padding: 15px 20px;

    .prompt {
      color: ${styles.darkJungleGreen};
      font-size: 15px;
    }

    .text {
      font-size: 13px;
      color: #658883;
      line-height: 20px;
    }

    .photo {
      width: 100%;
      margin-bottom: 10px;
    }
  }

  .icons {
    padding: 10px 25px 20px;
    text-align: right;

    .ant-btn {
      margin: 0 6px;
    }

    .anticon {
      color: ${styles.darkJungleGreen};
      font-size: 18px;
    }
  }
`;
