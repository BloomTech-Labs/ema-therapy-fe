import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled, { ThemeContext } from 'styled-components';
import { checkForUserAndGetMoodsQuery } from '../queries';
import { useAuth0 } from '../utils/react-auth0-spa';

function MoodDisplay() {
  const themeContext = useContext(ThemeContext);

  const Code = styled.code`
    color: ${themeContext.main};
  `;

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
      <Code>{JSON.stringify(data, null, 2)}</Code>
    </>
  );
}

export default MoodDisplay;
