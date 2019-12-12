import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'antd';
import styled from 'styled-components';
import MoodCard from '../../components/MoodCard';
import styles from '../../styles/theme';

const DayDisplay = ({ moods }) => {
  const history = useHistory();

  return (
    <DayContainer>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.push('/calendar')}
        />
      </Header>
      {moods && (
        <MoodList>
          {moods.length > 0 ? (
            moods.map((mood) => <MoodCard key={mood.id} mood={mood} />)
          ) : (
            <h1>No moods here :(</h1>
          )}
        </MoodList>
      )}
    </DayContainer>
  );
};

export default DayDisplay;

const DayContainer = styled.div`
  padding: 30px;
  background-color: ${styles.seafoamGreen};
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const MoodList = styled.div`
  padding-bottom: 90px;
`;
