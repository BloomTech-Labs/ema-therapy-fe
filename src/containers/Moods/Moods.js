import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { Spin } from 'antd';
import { Switch } from 'react-router-dom';
import Dashboard from '../Dashboard';
import WeekDisplay from '../../components/WeekDisplay';
import PrivateRoute from '../../components/PrivateRoute';
import DayDisplay from '../../components/DayDisplay';
import { useAuth } from '../../utils/dataStore';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import styles from '../../styles/theme';
import CalendarDisplay from '../../components/Calendar/CalendarDisplay';

const Moods = () => {
  const [moods, setMoods] = useState(null);
  const [moodsToDisplay, setMoodsToDisplay] = useState(null);
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

  // set moods if the data from query exists
  useEffect(() => {
    if (data) {
      setMoods(data.user.moods);
    }
  }, [data]);

  if (error) return <p>{error.message}</p>;

  return loading ? (
    <LoadingWrapper>
      <Spin size="large" delay={300} />
    </LoadingWrapper>
  ) : (
    <Switch>
      <PrivateRoute
        exact
        path="/dashboard"
        render={() => (
          <Dashboard>
            <Wrapper>
              <WeekDisplay
                moods={moods}
                handleMoodsToDisplay={handleMoodsToDisplay}
              />
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
      <PrivateRoute
        path="/dashboard/calendar"
        render={() => (
          <CalendarDisplay
            moods={moods}
            handleMoodsToDisplay={handleMoodsToDisplay}
          />
        )}
      />
    </Switch>
  );
};

export default Moods;

const Wrapper = styled.div`
  background-color: #f0f8f7;
  padding: 27px 27px 80px;
  min-height: 100vh;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50%;

  .ant-spin-dot-item {
    background-color: ${styles.darkJungleGreen} !important;
  }
`;
