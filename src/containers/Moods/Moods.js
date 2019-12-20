import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { getDay } from 'date-fns';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import WeekDisplay from '../../components/WeekDisplay';
import PrivateRoute from '../../components/PrivateRoute';
import DayDisplay from '../../components/DayDisplay';
import { useAuth } from '../../utils/dataStore';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import weekOfMoods from '../../utils/weekOfMoods';
import styles from '../../styles/theme';
import NotFound from '../NotFound/404';
import LoadingSpinner from '../../components/LoadingSpinner';

const Moods = () => {
  const [moodsThisWeek, setMoodsThisWeek] = useState(null);
  const [moodsToDisplay, setMoodsToDisplay] = useState(null);
  const { user } = useAuth();

  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const handleMoodsToDisplay = (day) => {
    // if day param is a number, use it to find the correspoding mood array
    if (typeof day === 'number') {
      for (let i = 0; i < moodsThisWeek.length; i += 1) {
        if (
          moodsThisWeek[i].length > 0 &&
          day === getDay(+moodsThisWeek[i][0].createdAt)
        ) {
          setMoodsToDisplay(moodsThisWeek[i]);
          break;
        }
      }
    } else {
      // day param is an updated mood array
      setMoodsToDisplay(day);
    }
  };

  // set moods if the data from query exists
  useEffect(() => {
    if (data) {
      setMoodsThisWeek(weekOfMoods(data.user.moods));
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
                  moods={moodsThisWeek}
                  handleMoodsToDisplay={handleMoodsToDisplay}
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
