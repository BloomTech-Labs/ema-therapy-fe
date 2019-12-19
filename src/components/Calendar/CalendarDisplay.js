import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import { isSameDay, isSameMonth, getDaysInMonth } from 'date-fns';
import styles from '../../styles/theme';
import Calendar from './Calendar';

const getMoodsByDay = (dateSelected, moodData) => {
  return moodData[dateSelected.getDate() - 1].filter((mood) =>
    isSameDay(+mood.createdAt, dateSelected),
  );
};

const getMoodsByMonth = (date, moodData) => {
  const dateTracker = new Date(date.getTime());
  const monthOfMoods = [];
  const monthData = moodData.filter((mood) =>
    isSameMonth(+mood.createdAt, dateTracker),
  );
  for (let i = 1, d = getDaysInMonth(dateTracker); i <= d; i += 1) {
    const moodsToday = monthData.filter((mood) =>
      isSameDay(+mood.createdAt, dateTracker.setDate(i)),
    );
    monthOfMoods.push(moodsToday);
  }
  return monthOfMoods;
};

const CalendarDisplay = ({ moods, handleMoodsToDisplay }) => {
  const [daySelected, setDaySelected] = useState(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [moodsThisMonth, setMoodsThisMonth] = useState(null);
  const history = useHistory();

  const handleDaySelected = (day) => {
    setDaySelected(day);
  };

  const handleActiveStartDate = (view) => {
    setActiveStartDate(view);
  };

  useEffect(() => {
    if (daySelected)
      handleMoodsToDisplay(getMoodsByDay(daySelected, moodsThisMonth));
  }, [daySelected, moodsThisMonth]);

  useEffect(() => {
    if (moods) setMoodsThisMonth(getMoodsByMonth(activeStartDate, moods));
  }, [moods, activeStartDate]);

  useEffect(() => {
    // if moods are null, go back to the dashboard
    if (!moods) {
      history.push('/dashboard');
    }
  }, [history, moods]);

  // return loading ? (
  //   <LoadingWrapper>
  //     <Spin size="large" delay={300} />
  //   </LoadingWrapper>
  // ) : (
  return (
    <>
      <Icon
        type="left"
        style={{ fontSize: 22, color: '#9cd9dd' }}
        onClick={() => history.goBack()}
      />
      <Calendar
        handleDaySelected={handleDaySelected}
        activeStartDate={activeStartDate}
        handleActiveStartDate={handleActiveStartDate}
        moodsThisMonth={moodsThisMonth}
      />
    </>
  );
};

export default CalendarDisplay;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50%;

  .ant-spin-dot-item {
    background-color: ${styles.darkJungleGreen} !important;
  }
`;
