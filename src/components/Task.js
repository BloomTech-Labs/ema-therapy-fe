import React from 'react';
import { Icon } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from '../containers/NotFound/404';
import styles from '../styles/theme';

function Task() {
  const { task } = useParams();
  const history = useHistory();
  if (!(task >= 1 && task <= 7)) return <NotFound />;
  return (
    <TaskWrapper>
      <Icon
        type="left"
        style={{ fontSize: 22, color: '#9cd9dd' }}
        onClick={() => history.goBack()}
      />
      <h1>Task {task}</h1>
    </TaskWrapper>
  );
}

export default Task;

const TaskWrapper = styled.div`
  background-color: ${styles.seafoamGreen};
  height: 100%;
  padding: 30px 25px;
`;
