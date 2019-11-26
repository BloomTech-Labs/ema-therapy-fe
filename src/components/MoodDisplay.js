import React, { useContext, useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getDay } from 'date-fns';
import { useAuth0 } from '../utils/react-auth0-spa';
import weekOfMoods from '../utils/weekOfMoods';
import { checkForUserAndGetMoodsQuery } from '../queries';
import MoodCard from './MoodCard';
import { MoodsPrevWeekContext } from '../contexts/MoodsPrevWeekContext';

function MoodDisplay() {
  const { moods, setMoods } = useContext(MoodsPrevWeekContext);
  const { day } = useParams();
  const [moodsToday, setMoodsToday] = useState(null);
  const { user } = useAuth0();
  const [getMoods, { loading, data }] = useLazyQuery(
    checkForUserAndGetMoodsQuery,
  );

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

  if (loading) return <p>Loading ...</p>;

  return (
    <MoodList>
      {moodsToday &&
        moodsToday.map((mood) => <MoodCard key={mood.id} mood={mood} />)}
      {!moodsToday && <h1>No moods here :(</h1>}
    </MoodList>
  );
}

export default MoodDisplay;

const MoodList = styled.div`
  padding-bottom: 90px;
  flex: 1;
`;
