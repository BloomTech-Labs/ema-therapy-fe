import React from 'react';
import { useHistory } from 'react-router-dom';
import { format, isSameMonth, getDaysInMonth } from 'date-fns';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import styles from '../../styles/theme';

function CalendarDisplay({
  handleDaySelected,
  activeStartDate,
  handleActiveStartDate,
  moodsThisMonth,
}) {
  const history = useHistory();

  const tileClassName = ({ date }) => {
    // console.log('tileClassName run');
    return isSameMonth(date, activeStartDate) &&
      moodsThisMonth &&
      moodsThisMonth.length === getDaysInMonth(activeStartDate) &&
      moodsThisMonth[date.getDate() - 1].length > 0
      ? 'contains-moods'
      : null;
  };

  const tileDisabled = ({ date }) => {
    return (
      isSameMonth(date, activeStartDate) &&
      moodsThisMonth &&
      moodsThisMonth.length === getDaysInMonth(activeStartDate) &&
      moodsThisMonth[date.getDate() - 1].length === 0
    );
  };

  return (
    <CalContainer>
      <Calendar
        calendarType="US"
        activeStartDate={activeStartDate}
        onActiveDateChange={({ activeStartDate: newActiveStartDate }) =>
          handleActiveStartDate(newActiveStartDate)
        }
        formatShortWeekday={(locale, date) => format(date, 'iiiii')}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        showNeighboringMonth={false}
        minDetail="month"
        minDate={new Date(2019, 10, 1)}
        onClickDay={async (value) => {
          // update day selected
          await handleDaySelected(value);
          // reroute to day display
          history.push('/calendar/day');
        }}
      />
    </CalContainer>
  );
}

CalendarDisplay.propTypes = {
  handleDaySelected: PropTypes.func.isRequired,
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  handleActiveStartDate: PropTypes.func.isRequired,
  moodsThisMonth: PropTypes.arrayOf(PropTypes.array),
};

CalendarDisplay.defaultProps = {
  moodsThisMonth: null,
};

export default CalendarDisplay;

const CalContainer = styled.div`
  .react-calendar {
    width: unset;
    border: unset;
    font-family: unset;
    line-height: unset;
  }

  .contains-moods {
    background-color: ${styles.brightYellow};
  }

  .react-calendar__month-view__days__day--weekend {
    color: unset;
  }

  .react-calendar__navigation button[disabled] {
    background-color: unset;
    cursor: unset;
  }

  .react-calendar__tile:disabled {
    background-color: unset;
  }

  abbr[title] {
    text-decoration: none;
    cursor: unset;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
`;
