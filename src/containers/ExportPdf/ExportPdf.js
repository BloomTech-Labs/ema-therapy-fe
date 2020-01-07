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
import backgroundImg from '../../assets/background-leaf.svg';
import ladybug from '../../assets/ladybug.svg';

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
    <ExportView>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.push('/dashboard/settings')}
        />
      </Header>
      <p
        style={{
          fontSize: 20,
          padding: '10px',
          marginTop: '75px',
          textAlign: 'center',
        }}
      >
        Select an option below to export your entries as a PDF:
      </p>
      <WeekPdf />
      <MonthPdf />
      <AllMoodsPdf />
    </ExportView>
  );
}

export default ExportPdf;

const Header = styled.div`
  margin: 20px;
  align-self: flex-start;
`;

const ExportView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImg}), url(${ladybug});
  background-repeat: no-repeat;
  background-position: top -36px right -20px, bottom 5% left 10%;
`;
