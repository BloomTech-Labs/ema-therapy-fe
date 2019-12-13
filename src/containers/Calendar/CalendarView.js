import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Spin } from 'antd';
import { isSameDay, isSameMonth, getDaysInMonth } from 'date-fns';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import { useAuth } from '../../utils/dataStore';
import CalendarDisplay from './CalendarDisplay';
import DayDisplay from './DayDisplay';
import styles from '../../styles/theme';

const getMoodsByDay = (dateSelected, moodData) => {
  return moodData[dateSelected.getDate() - 1].filter((mood) =>
    isSameDay(+mood.createdAt, dateSelected),
  );
};

const getMoodsByMonth = (date, moodData) => {
  const monthOfMoods = [];
  const monthData = moodData.filter((mood) =>
    isSameMonth(+mood.createdAt, date),
  );
  for (let i = 1, d = getDaysInMonth(date); i <= d; i += 1) {
    const moodsToday = monthData.filter((mood) =>
      isSameDay(+mood.createdAt, date.setDate(i)),
    );
    monthOfMoods.push(moodsToday);
  }
  return monthOfMoods;
};

const CalendarView = () => {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const [daySelected, setDaySelected] = useState(null);
  const [moodsToDisplay, setMoodsToDisplay] = useState(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [moodsThisMonth, setMoodsThisMonth] = useState(null);

  const handleDaySelected = (day) => {
    setDaySelected(day);
  };

  const handleActiveStartDate = (view) => {
    setActiveStartDate(view);
  };

  useEffect(() => {
    if (daySelected)
      setMoodsToDisplay(getMoodsByDay(daySelected, moodsThisMonth));
  }, [daySelected, moodsThisMonth]);

  useEffect(() => {
    if (data)
      setMoodsThisMonth(getMoodsByMonth(activeStartDate, data.user.moods));
  }, [data, activeStartDate]);

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
            <CalendarDisplay
              handleDaySelected={handleDaySelected}
              activeStartDate={activeStartDate}
              handleActiveStartDate={handleActiveStartDate}
              moodsThisMonth={moodsThisMonth}
            />
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
