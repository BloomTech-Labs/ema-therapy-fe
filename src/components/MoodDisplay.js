import React from 'react';
import { getMoodsQuery } from '../queries';
import { useQuery } from '@apollo/react-hooks';
// import { useAuth0 } from '../react-auth0-spa';

function MoodDisplay({ sub }) {
  const { loading, error, data } = useQuery(getMoodsQuery, {
    variables: { sub: sub },
  });

  console.log('data: ', data);

  return <div>hey</div>;
}

export default MoodDisplay;
