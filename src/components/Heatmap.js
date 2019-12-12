import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { format, isSameDay } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { useAuth0 } from '../utils/react-auth0-spa';
import styles from '../styles/theme';

const filterMoodByDay = (dateSelected, moodData) => {
  return moodData.filter((mood) => isSameDay(+mood.createdAt, dateSelected));
};

function Heatmap() {
  const { user } = useAuth0();
  const history = useHistory();
  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      sub: user.sub,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  if (error) return <p>{error.message}</p>;

  return loading ? (
    <LoadingWrapper>
      <Spin size="large" delay={300} />
    </LoadingWrapper>
  ) : (
    <CalContainer>
      <Calendar
        calendarType="US"
        formatShortWeekday={(locale, date) => format(date, 'iiiii')}
        onClickDay={(value) => {
          console.log(filterMoodByDay(value, data.user.moods));
        }}
      />
    </CalContainer>
  );
}

export default Heatmap;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50%;

  .ant-spin-dot-item {
    background-color: ${styles.darkJungleGreen} !important;
  }
`;

const CalContainer = styled.div`
  .react-calendar {
    width: unset;
    border: unset;
    font-family: unset;
    line-height: unset;
  }
`;
