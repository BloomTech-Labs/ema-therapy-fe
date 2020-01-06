import React from 'react';
import { useHistory } from 'react-router-dom';
import { format, isSameMonth, getDaysInMonth } from 'date-fns';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactCalendar from 'react-calendar';
import styles from '../../styles/theme';
import DateRings from './DateRings';

const Calendar = ({
  handleDaySelected,
  activeStartDate,
  handleActiveStartDate,
  moodsThisMonth,
  handleTasksToDisplay,
}) => {
  const history = useHistory();

  // eslint-disable-next-line react/prop-types
  const tileContent = ({ date }) => {
    return isSameMonth(date, activeStartDate) &&
      moodsThisMonth &&
      moodsThisMonth.length === getDaysInMonth(activeStartDate) &&
      // eslint-disable-next-line react/prop-types
      moodsThisMonth[date.getDate() - 1].length > 0 &&
      isSameMonth(
        // eslint-disable-next-line react/prop-types
        +moodsThisMonth[date.getDate() - 1][0].createdAt,
        activeStartDate,
      ) ? (
      // eslint-disable-next-line react/prop-types
      <DateRings moodList={moodsThisMonth[date.getDate() - 1]} />
    ) : null;
  };

  const tileDisabled = ({ date }) => {
    return (
      (isSameMonth(date, activeStartDate) &&
        moodsThisMonth &&
        moodsThisMonth.length === getDaysInMonth(activeStartDate) &&
        moodsThisMonth[date.getDate() - 1].length === 0) ||
      !isSameMonth(date, activeStartDate)
    );
  };

  return (
    <CalContainer>
      <ReactCalendar
        calendarType="US"
        activeStartDate={activeStartDate}
        onActiveDateChange={({ activeStartDate: newActiveStartDate }) =>
          handleActiveStartDate(newActiveStartDate)
        }
        formatShortWeekday={(locale, date) => format(date, 'iiiii')}
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        minDetail="month"
        minDate={new Date(2019, 10, 1)}
        onClickDay={async (value) => {
          // update day selected
          await handleDaySelected(value);
          await handleTasksToDisplay(value);
          // reroute to day display
          history.push('/dashboard/day');
        }}
      />
    </CalContainer>
  );
};

Calendar.propTypes = {
  handleDaySelected: PropTypes.func.isRequired,
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  handleActiveStartDate: PropTypes.func.isRequired,
  moodsThisMonth: PropTypes.arrayOf(PropTypes.array),
  handleTasksToDisplay: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  moodsThisMonth: null,
};

export default Calendar;

const CalContainer = styled.div`
  padding-bottom: 14px;
  border-bottom: 1px solid #e8e8e8;

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

  .react-calendar__navigation button[disabled],
  .react-calendar__tile:disabled {
    background-color: unset;
    cursor: unset;
  }

  abbr[title] {
    text-decoration: none;
    cursor: unset;
  }

  .react-calendar__month-view__days__day {
    font-family: sans-serif;
    font-size: 14px;
    color: #595959;
    position: relative;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #bfbfbf;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: ${styles.darkJungleGreen};
  }

  .react-calendar__navigation {
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
  }

  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__navigation__label {
    color: ${styles.darkJungleGreen};
    font-weight: 600;
    font-size: 14px;
  }

  .react-calendar__viewContainer {
    padding: 30px 0;
    width: 335px;
    margin: 0 auto;
  }

  .ring {
    position: absolute;
  }

  .inner-ring {
    top: 7px;
    left: 10px;
  }

  .middle-ring {
    top: 5px;
    left: 8px;
  }

  .outer-ring {
    top: 3px;
    left: 6px;
  }
`;
