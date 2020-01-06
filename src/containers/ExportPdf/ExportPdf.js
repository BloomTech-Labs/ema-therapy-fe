import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import { useAuth } from '../../utils/dataStore';
import AllMoodsPdf from '../../components/ExportPdf/AllMoodsPdf';
import MonthPdf from '../../components/ExportPdf/MonthPdf';
import WeekPdf from '../../components/ExportPdf/WeekPdf';

const Header = styled.div`
  margin: 20px;
`;

function ExportPdf() {
  const history = useHistory();
  const { user } = useAuth();
  const { loading, error } = useQuery(checkForUserAndGetMoodsQuery, {
    variables: {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.push('/dashboard/settings')}
        />
      </Header>
      <AllMoodsPdf />
      <MonthPdf />
      <WeekPdf />
    </>
  );
}

export default ExportPdf;
