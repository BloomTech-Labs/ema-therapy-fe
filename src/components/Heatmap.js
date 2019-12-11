import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getDay } from 'date-fns';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { useAuth0 } from '../utils/react-auth0-spa';
import weekOfMoods from '../utils/weekOfMoods';
import MoodPreview from './MoodPreview';
import { MoodsPrevWeekContext } from '../contexts/MoodsPrevWeekContext';
import styles from '../styles/theme';

function Heatmap() {
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      sub: user.sub,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  const { moods, setMoods } = useContext(MoodsPrevWeekContext);

  // set moodsPrevWeek context if the data from query exists
  useEffect(() => {
    if (data) {
      setMoods(weekOfMoods(data.user.moods));
    }
  }, [data, setMoods]);

  if (error) return <p>{error.message}</p>;

  console.log('moods in Heatmap.js', moods, new Date());
  return loading ? (
    <LoadingWrapper>
      <Spin size="large" delay={300} />
    </LoadingWrapper>
  ) : (
    <>
      <Greeting>Here you are, {user.given_name}!</Greeting>
      <Calendar value={new Date()} />
    </>
  );
}

export default Heatmap;

const Greeting = styled.h2`
  color: #00917a;
  font-size: 21px;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 30px;
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
