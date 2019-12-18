import React from 'react';
import { Icon } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import NotFound from '../containers/NotFound/404';

function Task() {
  const { task } = useParams();
  if (!(task >= 1 && task <= 7)) return <NotFound />;

  return (
    <>
      <Icon
        type="left"
        style={{ fontSize: 22, color: '#9cd9dd' }}
        onClick={() => console.log('go back')}
      />
      <h1>Task {task}</h1>
    </>
  );
}

export default Task;
