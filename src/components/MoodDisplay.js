import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Spin } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import { getDay } from 'date-fns';
import { useAuth } from '../utils/dataStore';
import { checkForUserAndGetMoodsQuery, removeMoodMutation } from '../queries';
import { MoodsPrevWeekContext } from '../contexts/MoodsPrevWeekContext';
import weekOfMoods from '../utils/weekOfMoods';
import MoodCard from './MoodCard';
import styles from '../styles/theme';

function MoodDisplay() {
  const { moods, setMoods } = useContext(MoodsPrevWeekContext);
  const { day } = useParams();
  const [moodsToday, setMoodsToday] = useState(null);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const { user } = useAuth();
  const [getMoods, { loading, data }] = useLazyQuery(
    checkForUserAndGetMoodsQuery,
  );
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
    })
      .then((res) => {
        setMoodsToday(
          moodsToday.filter((mood) => mood.id !== res.data.removeMood.id),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (moodsToday && moodsToday.length === 0) {
      history.push('/dashboard');
    }

    if (isFirstLoading) {
      // if moods exist in context, find the mood that matches the day from url and set to state
      if (moods) {
        for (let i = 0; i < moods.length; i += 1) {
          if (moods[i].length > 0 && +day === getDay(+moods[i][0].createdAt)) {
            setMoodsToday(moods[i]);
            break;
          }
        }
        setIsFirstLoading(false);
        // if data was returned from query, save result to context
      } else if (data) {
        setMoods(weekOfMoods(data.user.moods));
        // run query to fetch missing moods data
      } else {
        getMoods({
          variables: {
            email: user.email,
          },
        });
      }
    }
  }, [
    day,
    moods,
    data,
    setMoods,
    user,
    getMoods,
    history,
    moodsToday,
    isFirstLoading,
  ]);

  return loading || deleteLoading ? (
    <LoadingWrapper>
      <Spin size="large" delay={200} />
    </LoadingWrapper>
  ) : (
    <StyledMoodDisplay>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.push('/dashboard')}
        />
      </Header>
      <MoodList>
        {moodsToday &&
          moodsToday.map((mood) => (
            <MoodCard key={mood.id} mood={mood} deleteMood={deleteMood} />
          ))}
        {!moods && !moodsToday && <h1>No moods here :(</h1>}
      </MoodList>
    </StyledMoodDisplay>
  );
}

export default MoodDisplay;

const StyledMoodDisplay = styled.div`
  padding: 30px;
  background-color: ${styles.seafoamGreen};
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const MoodList = styled.div`
  padding-bottom: 90px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${styles.seafoamGreen};
  height: 100%;

  .ant-spin-dot-item {
    background-color: ${styles.darkJungleGreen} !important;
  }
`;
