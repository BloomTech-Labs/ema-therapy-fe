import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import { getDay } from 'date-fns';
import { useAuth0 } from '../utils/react-auth0-spa';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { MoodsPrevWeekContext } from '../contexts/MoodsPrevWeekContext';
import weekOfMoods from '../utils/weekOfMoods';
import MoodCard from './MoodCard';

function MoodDisplay() {
  const { moods, setMoods } = useContext(MoodsPrevWeekContext);
  const { day } = useParams();
  const [moodsToday, setMoodsToday] = useState(null);
  const { user } = useAuth0();
  const [getMoods, { loading, data }] = useLazyQuery(
    checkForUserAndGetMoodsQuery,
  );
  const history = useHistory();

  useEffect(() => {
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
          sub: user.sub,
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
  background-color: #f0f8f7;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const MoodList = styled.div`
  padding-bottom: 90px;
  flex: 1;
`;
