import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { useAuth0 } from '../utils/react-auth0-spa';
import MoodCard from './MoodCard';

function MoodDisplay() {
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      sub: user.sub,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  // console.log(data);
  // console.log(user);

  if (error) return <p>Error</p>;
  return loading ? null : (
    <MoodList>
      {data.user.moods.map((mood) => (
        <MoodCard key={mood.id} mood={mood} />
      ))}
    </MoodList>
  );
}

export default MoodDisplay;

const MoodList = styled.div`
  padding: 0 31px;
  padding-bottom: 90px;
  flex: 1;
`;
