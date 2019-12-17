import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, message } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../utils/dataStore';
import { checkForUserAndGetMoodsQuery, removeMoodMutation } from '../queries';
import MoodCard from './MoodCard';
import styles from '../styles/theme';

const DayDisplay = ({ moodsToDisplay, handleMoodsToDisplay }) => {
  const { user } = useAuth();
  const history = useHistory();

  const [removeMood, { loading: deleteLoading }] = useMutation(
    removeMoodMutation,
  );

  const deleteMood = (id) => {
    // run the delete mutation
    removeMood({
      variables: { id },
      refetchQueries: [
        {
          query: checkForUserAndGetMoodsQuery,
          variables: { email: user.email },
        },
      ],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        // remove the deleted mood from state
        handleMoodsToDisplay(
          moodsToDisplay.filter((mood) => mood.id !== res.data.removeMood.id),
        );
      })
      .catch(() => {
        message.error('Error: Unable to delete mood');
      });
  };

  useEffect(() => {
    // if moods are null or everything has been deleted, go back to the dashboard
    if (!moodsToDisplay || moodsToDisplay.length === 0) {
      history.push('/dashboard');
    }
  }, [history, moodsToDisplay]);

  return (
    <StyledMoodDisplay>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.push('/dashboard')}
        />
      </Header>
      <MoodList>
        {moodsToDisplay &&
          moodsToDisplay.map((mood) => (
            <MoodCard
              key={mood.id}
              mood={mood}
              deleteMood={deleteMood}
              deleteLoading={deleteLoading}
            />
          ))}
      </MoodList>
    </StyledMoodDisplay>
  );
};

DayDisplay.propTypes = {
  moodsToDisplay: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      anxietyLevel: PropTypes.number,
      text: PropTypes.string,
      sleep: PropTypes.number,
      weather: PropTypes.string,
    }),
  ),
  handleMoodsToDisplay: PropTypes.func.isRequired,
};

DayDisplay.defaultProps = {
  moodsToDisplay: null,
};

export default DayDisplay;

const StyledMoodDisplay = styled.div`
  padding: 0 14px;
  background-color: ${styles.seafoamGreen};
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const MoodList = styled.div`
  padding-bottom: 90px;
`;
