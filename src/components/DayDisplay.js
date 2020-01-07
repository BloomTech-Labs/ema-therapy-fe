import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, message } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../utils/dataStore';
import {
  checkForUserAndGetMoodsQuery,
  removeMoodMutation,
  removeTaskMutation,
} from '../queries';
import MoodCard from './MoodCard';
import styles from '../styles/theme';
import FormViews from './FormViews';
import TaskCard from './TaskCard';

const DayDisplay = ({
  moodsToDisplay,
  handleMoodsToDisplay,
  tasksToDisplay,
  handleTasksToDisplay,
}) => {
  const { user } = useAuth();
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [moodToEdit, setMoodToEdit] = useState(null);

  const [removeMood, { loading: deleteMoodLoading }] = useMutation(
    removeMoodMutation,
  );

  const [removeTask, { loading: deleteTaskLoading }] = useMutation(
    removeTaskMutation,
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

  const editMood = (mood) => {
    setIsEditing(true);
    setMoodToEdit(mood);
  };

  const stopEditing = (status, updatedMood) => {
    setIsEditing(false);
    if (status === 'success') {
      handleMoodsToDisplay(
        moodsToDisplay.map((mood) =>
          mood.id === updatedMood.id ? updatedMood : mood,
        ),
      );
    } else if (status === 'error') {
      message.error('Error: Unable to edit mood');
    }
    // if status is cancel or anything else, do nothing
  };

  // mutations for remove task

  const deleteTask = (taskId) => {
    removeTask({
      variables: { id: taskId },
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
        handleTasksToDisplay(
          tasksToDisplay.filter((task) => task.id !== res.data.removeTask.id),
        );
      })
      .catch(() => {
        message.error('Error: Unable to delete task');
      });
  };

  useEffect(() => {
    // if moods are null or everything has been deleted, go back to the dashboard
    if (!moodsToDisplay || moodsToDisplay.length === 0) {
      history.push('/dashboard');
    }
  }, [history, moodsToDisplay]);

  return isEditing ? (
    <FormViews editInitial={moodToEdit} stopEditing={stopEditing} />
  ) : (
    <StyledMoodDisplay>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.goBack()}
        />
      </Header>
      <div>
        {moodsToDisplay &&
          moodsToDisplay
            .reverse()
            .map((mood) => (
              <MoodCard
                key={mood.id}
                mood={mood}
                deleteMood={deleteMood}
                deleteLoading={deleteMoodLoading}
                editMood={editMood}
                isEditing={isEditing}
              />
            ))}
      </div>
      {tasksToDisplay && tasksToDisplay.length > 0 && (
        <div>
          <StyledTaskHeader>Completed Tasks</StyledTaskHeader>
          {tasksToDisplay &&
            tasksToDisplay
              .reverse()
              .map((task) => (
                <TaskCard
                  deleteTask={deleteTask}
                  deleteLoading={deleteTaskLoading}
                  key={task.id}
                  task={task}
                />
              ))}
        </div>
      )}
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
  handleTasksToDisplay: PropTypes.func.isRequired,
  tasksToDisplay: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      completedAt: PropTypes.string.isRequired,
      prompt: PropTypes.string.isRequired,
      text: PropTypes.string,
      photoUrl: PropTypes.string,
    }),
  ),
};

DayDisplay.defaultProps = {
  moodsToDisplay: null,
  tasksToDisplay: null,
};

export default DayDisplay;

const StyledMoodDisplay = styled.div`
  padding: 30px 30px 90px;
  background-color: ${styles.seafoamGreen};
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const StyledTaskHeader = styled.h1`
  color: ${styles.darkJungleGreen};
  font-size: 20px;
  padding: 8px 8px 0;
`;
