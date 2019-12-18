import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../containers/NotFound/404';

function Task() {
  const { task } = useParams();
  if (!(task >= 1 && task <= 7)) return <NotFound />;

  return <h1>Task {task}</h1>;
}

export default Task;
