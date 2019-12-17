import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Spin, message } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import { getDay } from 'date-fns';
import { useAuth } from '../utils/dataStore';
import { checkForUserAndGetMoodsQuery, removeMoodMutation } from '../queries';
import { MoodsPrevWeekContext } from '../contexts/MoodsPrevWeekContext';
import weekOfMoods from '../utils/weekOfMoods';
import MoodCard from './MoodCard';
import styles from '../styles/theme';

const DayDisplay = ({ currentDay, handleCurrentDay }) => {
  const { user } = useAuth();
  const history = useHistory();

  const [removeMood, { loading: deleteLoading }] = useMutation(
    removeMoodMutation,
  );

  const deleteMood = (id) => {
    removeMood({
      variables: { id },
      refetchQueries: [
        {
          query: checkForUserAndGetMoodsQuery,
          variables: { email: user.email },
        },
      ],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        handleCurrentDay(
          currentDay.filter((mood) => mood.id !== res.data.removeMood.id),
        );
      })
      .catch(() => {
        message.error('Error: Unable to delete mood');
      });
  };

  useEffect(() => {
    if (!currentDay || currentDay.length === 0) {
      history.push('/dashboard');
    }
  }, [history, currentDay]);

  return (
    <StyledMoodDisplay>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.push('/dashboard')}
        />
      </Header>
      <MoodList>
        {currentDay &&
          currentDay.map((mood) => (
            <MoodCard
              key={mood.id}
              mood={mood}
              deleteMood={deleteMood}
              deleteLoading={deleteLoading}
            />
          ))}
      </MoodList>
    </StyledMoodDisplay>
  );
};

export default DayDisplay;

const StyledMoodDisplay = styled.div`
  padding: 0 14px;
  background-color: ${styles.seafoamGreen};
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const MoodList = styled.div`
  padding-bottom: 90px;
`;
