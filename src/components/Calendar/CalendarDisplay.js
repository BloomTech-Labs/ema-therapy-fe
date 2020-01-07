import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { isSameDay, isSameMonth, getDaysInMonth } from 'date-fns';
import styles from '../../styles/theme';
import Calendar from './Calendar';
import Card from '../Card';
import CalendarLegend from './CalendarLegend';

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

const CalendarDisplay = ({
  moods,
  handleMoodsToDisplay,
  handleTasksToDisplay,
}) => {
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
  }, [daySelected, moodsThisMonth, handleMoodsToDisplay]);

  useEffect(() => {
    if (moods) setMoodsThisMonth(getMoodsByMonth(activeStartDate, moods));
  }, [moods, activeStartDate]);

  useEffect(() => {
    // if moods are null, go back to the dashboard
    if (!moods) {
      history.push('/dashboard');
    }
  }, [history, moods]);

  return (
    <Wrapper>
      <StyledCard>
        <div className="header">
          <p>Select date to see your mood</p>
          <Icon
            type="close"
            style={{ color: '#8C8C8C' }}
            onClick={() => history.goBack()}
          />
        </div>
        <Calendar
          handleDaySelected={handleDaySelected}
          activeStartDate={activeStartDate}
          handleActiveStartDate={handleActiveStartDate}
          moodsThisMonth={moodsThisMonth}
          handleTasksToDisplay={handleTasksToDisplay}
        />
        <CalendarLegend />
      </StyledCard>
    </Wrapper>
  );
};

CalendarDisplay.propTypes = {
  moods: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      anxietyLevel: PropTypes.number,
      text: PropTypes.string,
      sleep: PropTypes.number,
      weather: PropTypes.string,
    }),
  ),
  handleMoodsToDisplay: PropTypes.func.isRequired,
  handleTasksToDisplay: PropTypes.func.isRequired,
};

CalendarDisplay.defaultProps = {
  moods: null,
};

export default CalendarDisplay;

const Wrapper = styled.div`
  background-color: ${styles.seafoamGreen};
  height: 100%;
  padding: 60px 10px 0;
`;

const StyledCard = styled(Card)`
  /* height: 475px; */
  padding: 20px 10px 10px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 12px;

    p {
      color: #bfbfbf;
      font-size: 12px;
      margin: unset;
    }
  }
`;
