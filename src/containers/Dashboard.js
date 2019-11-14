import React from 'react';
import { useSelector } from 'react-redux';
import useFetching from '../hooks/useFetching';
import { getEntries } from '../redux/actions/entryActions';

const Dashboard = () => {
  useFetching(getEntries);

  const user = useSelector((state) => state);

  return <h1>Hello {user.entryReducer.email}</h1>;
};

export default Dashboard;
