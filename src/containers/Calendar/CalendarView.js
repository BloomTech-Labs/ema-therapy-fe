import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Spin } from 'antd';
import { isSameDay } from 'date-fns';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import { useAuth0 } from '../../utils/react-auth0-spa';
import CalendarDisplay from './CalendarDisplay';
import DayDisplay from './DayDisplay';
import styles from '../../styles/theme';

const filterMoodByDay = (dateSelected, moodData) => {
  return moodData.filter((mood) => isSameDay(+mood.createdAt, dateSelected));
};

const CalendarView = () => {
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      sub: user.sub,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const [daySelected, setDaySelected] = useState(null);
  const [moodsToDisplay, setMoodsToDisplay] = useState(null);

  const handleDaySelected = (day) => {
    setDaySelected(day);
  };

  useEffect(() => {
    if (data) setMoodsToDisplay(filterMoodByDay(daySelected, data.user.moods));
  }, [daySelected, data]);

  if (error) return <p>{error.message}</p>;
  return loading ? (
    <LoadingWrapper>
      <Spin size="large" delay={300} />
    </LoadingWrapper>
  ) : (
    <>
      <Switch>
        <Route
          exact
          path="/calendar"
          render={() => (
            <CalendarDisplay handleDaySelected={handleDaySelected} />
          )}
        />
        <Route
          path="/calendar/day"
          render={() => <DayDisplay moods={moodsToDisplay} />}
        />
      </Switch>
    </>
  );
};

export default CalendarView;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50%;

  .ant-spin-dot-item {
    background-color: ${styles.darkJungleGreen} !important;
  }
`;
