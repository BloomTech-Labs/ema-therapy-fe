import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
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
  const [isLoadingMoods, setIsLoadingMoods] = useState(true);
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
          setIsLoadingMoods(false);
          break;
        }
      }
      // if data was returned from query, save result to context
    } else if (data) {
      setMoods(weekOfMoods(data.user.moods));
      // run query to fetch missing moods data
    } else {
      setIsLoadingMoods(false);
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
    <>
      <HeaderDiv>
        <Logo>Logo</Logo>
        <BackBtn type="button" onClick={() => history.push('/dashboard')}>
          X
        </BackBtn>
      </HeaderDiv>
      <MoodList>
        {moodsToday &&
          moodsToday.map((mood) => <MoodCard key={mood.id} mood={mood} />)}
        {!isLoadingMoods && !moodsToday && <h1>No moods here :(</h1>}
      </MoodList>
    </>
  );
}

export default MoodDisplay;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 60px 0 40px;
`;

const Logo = styled.h1`
  margin: auto;
`;

const BackBtn = styled.button`
  border: none;
  background-color: white;
  font-weight: bold;
  font-size: 30px;
`;

const MoodList = styled.div`
  padding-bottom: 90px;
  flex: 1;
`;
