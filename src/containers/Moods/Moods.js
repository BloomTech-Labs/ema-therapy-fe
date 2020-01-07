import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { Switch, Route } from 'react-router-dom';
import { isSameDay } from 'date-fns';
import Dashboard from '../Dashboard';
import WeekDisplay from '../../components/WeekDisplay';
import PrivateRoute from '../../components/PrivateRoute';
import DayDisplay from '../../components/DayDisplay';
import { useAuth } from '../../utils/dataStore';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import styles from '../../styles/theme';
import NotFound from '../NotFound/404';
import LoadingSpinner from '../../components/LoadingSpinner';
import CalendarDisplay from '../../components/Calendar/CalendarDisplay';

const Moods = () => {
  const [moods, setMoods] = useState(null);
  const [moodsToDisplay, setMoodsToDisplay] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [tasksToDisplay, setTasksToDisplay] = useState(null);
  const { user } = useAuth();

  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const handleMoodsToDisplay = (updatedMoods) => {
    setMoodsToDisplay(updatedMoods);
  };

  const handleTasksToDisplay = (date) => {
    const newTasks = tasks.filter((task) => isSameDay(+task.completedAt, date));
    setTasksToDisplay(newTasks);
  };

  const handleUpdatedTasks = (updatedTasks) => {
    setTasksToDisplay(updatedTasks);
  };

  // set moods if the data from query exists
  useEffect(() => {
    if (data) {
      setMoods(data.user.moods);
      setTasks(data.user.tasks);
    }
  }, [data]);

  if (error) return <p>{error.message}</p>;

  return (
    <Switch>
      <PrivateRoute
        exact
        path="/dashboard"
        render={() => (
          <Dashboard>
            <Wrapper>
              {loading ? (
                <LoadingSpinner margin="50% 0 0 0" />
              ) : (
                <WeekDisplay
                  moods={moods}
                  handleMoodsToDisplay={handleMoodsToDisplay}
                  handleTasksToDisplay={handleTasksToDisplay}
                />
              )}
            </Wrapper>
          </Dashboard>
        )}
      />
      <PrivateRoute
        path="/dashboard/day"
        render={() => (
          <DayDisplay
            moodsToDisplay={moodsToDisplay}
            handleMoodsToDisplay={handleMoodsToDisplay}
            tasksToDisplay={tasksToDisplay}
            handleTasksToDisplay={handleUpdatedTasks}
          />
        )}
      />
      <PrivateRoute
        path="/dashboard/calendar"
        render={() => (
          <CalendarDisplay
            moods={moods}
            handleMoodsToDisplay={handleMoodsToDisplay}
            handleTasksToDisplay={handleTasksToDisplay}
          />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Moods;

const Wrapper = styled.div`
  background-color: ${styles.seafoamGreen};
  padding: 27px 16px 80px;
  min-height: 100vh;
`;
