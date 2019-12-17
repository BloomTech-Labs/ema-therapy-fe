import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { Spin } from 'antd';
import { getDay } from 'date-fns';
import Dashboard from '../Dashboard';
import WeekDisplay from '../../components/WeekDisplay';
import PrivateRoute from '../../components/PrivateRoute';
import DayDisplay from '../../components/DayDisplay';
import { useAuth } from '../../utils/dataStore';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import weekOfMoods from '../../utils/weekOfMoods';
import styles from '../../styles/theme';

const Moods = () => {
  const [moods, setMoods] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const { user } = useAuth();

  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const handleCurrentDay = (day) => {
    if (typeof day === 'number') {
      for (let i = 0; i < moods.length; i += 1) {
        if (moods[i].length > 0 && +day === getDay(+moods[i][0].createdAt)) {
          setCurrentDay(moods[i]);
          break;
        }
      }
    } else {
      setCurrentDay(day);
    }
  };

  // set moods if the data from query exists
  useEffect(() => {
    if (data) {
      setMoods(weekOfMoods(data.user.moods));
    }
  }, [data]);

  if (error) return <p>{error.message}</p>;
  return loading ? (
    <LoadingWrapper>
      <Spin size="large" delay={300} />
    </LoadingWrapper>
  ) : (
    <Dashboard>
      <Wrapper>
        <PrivateRoute
          exact
          path="/dashboard"
          render={() => (
            <WeekDisplay moods={moods} handleCurrentDay={handleCurrentDay} />
          )}
        />
        <PrivateRoute
          path="/dashboard/day"
          render={() => (
            <DayDisplay
              currentDay={currentDay}
              handleCurrentDay={handleCurrentDay}
            />
          )}
        />
      </Wrapper>
    </Dashboard>
  );
};

export default Moods;

const Wrapper = styled.div`
  background-color: #f0f8f7;
  padding: 27px 16px 80px;
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
