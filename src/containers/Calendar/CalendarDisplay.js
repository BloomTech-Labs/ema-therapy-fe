import React from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import styled from 'styled-components';
import Calendar from 'react-calendar';

function CalendarDisplay({ handleDaySelected }) {
  const history = useHistory();

  return (
    <CalContainer>
      <Calendar
        calendarType="US"
        formatShortWeekday={(locale, date) => format(date, 'iiiii')}
        onClickDay={async (value) => {
          // console.log(filterMoodByDay(value, data.user.moods));
          // update day selected
          await handleDaySelected(value);
          // reroute to day display
          history.push('/calendar/day');
        }}
      />
    </CalContainer>
  );
}

export default CalendarDisplay;

const CalContainer = styled.div`
  .react-calendar {
    width: unset;
    border: unset;
    font-family: unset;
    line-height: unset;
  }
`;
