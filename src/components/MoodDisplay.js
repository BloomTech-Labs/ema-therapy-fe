import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { useAuth0 } from '../react-auth0-spa';

function MoodDisplay() {
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: { sub: user.sub, email: user.email },
  });

  // console.log('data: ', data);
  // console.log('user: ', user);
  if (loading) return <p>Loading Moods...</p>;
  if (error) return <p>Error fetching moods.</p>;
  return (
    <>
      <code>{JSON.stringify(data, null, 2)}</code>
    </>
  );
}

export default MoodDisplay;
