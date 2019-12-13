import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import { getDay } from 'date-fns';
import { useAuth } from '../utils/dataStore';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { MoodsPrevWeekContext } from '../contexts/MoodsPrevWeekContext';
import weekOfMoods from '../utils/weekOfMoods';
import MoodCard from './MoodCard';
import styles from '../styles/theme';

function MoodDisplay() {
  const { moods, setMoods } = useContext(MoodsPrevWeekContext);
  const { day } = useParams();
  const [moodsToday, setMoodsToday] = useState(null);
  const { user } = useAuth();
  const [getMoods, { loading, data }] = useLazyQuery(
    checkForUserAndGetMoodsQuery,
  );
  const history = useHistory();

  useEffect(() => {
    console.log('user in moodDisplay:', user);
    // if moods exist in context, find the mood that matches the day from url and set to state
    if (moods) {
      for (let i = 0; i < moods.length; i += 1) {
        if (moods[i].length > 0 && +day === getDay(+moods[i][0].createdAt)) {
          setMoodsToday(moods[i]);
          break;
        }
      }
      // if data was returned from query, save result to context
    } else if (data) {
      setMoods(weekOfMoods(data.user.moods));
      // run query to fetch missing moods data
    } else {
      getMoods({
        variables: {
          email: user.email,
          firstName: user.given_name,
          lastName: user.family_name,
        },
      });
    }
  }, [day, moods, data, getMoods, setMoods, user]);

  return loading ? null : (
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
          moodsToday.map((mood) => <MoodCard key={mood.id} mood={mood} />)}
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
