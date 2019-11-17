import React from 'react';
import { getMoodsQuery } from '../queries';
import { useQuery } from '@apollo/react-hooks';

function MoodDisplay({ sub }) {
  const { loading, error, data } = useQuery(getMoodsQuery, {
    variables: { sub: sub },
  });

  console.log('data: ', data);

  return <code>{JSON.stringify(data, null, 2)}</code>;
}

export default MoodDisplay;
