import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';
import {
  addMoodMutation,
  getUserIdAndLocation,
  checkForUserAndGetMoodsQuery,
  editMoodMutation,
} from '../../queries';
import useCurrentWeather from '../../hooks/useCurrentWeather';
import FormMood from './FormMood';
import FormJournal from './FormJournal';
import FormAnxietySleep from './FormAnxietySleep';
import Activities from './Activities';
import LoadingSpinner from '../LoadingSpinner';
import styles from '../../styles/theme';

const FormViews = ({ editInitial, stopEditing }) => {
  const history = useHistory();
  const { user } = useAuth();
  const { currentWeather } = useCurrentWeather(user);
  const [addMood] = useMutation(addMoodMutation);
  const [editMood] = useMutation(editMoodMutation);
  const { loading, error, data } = useQuery(getUserIdAndLocation, {
    variables: { email: user.email },
  });

  const [view, setView] = useState('mood');
  const [input, setInput] = useState({
    mood: editInitial ? editInitial.mood : 3,
    activities:
      editInitial && editInitial.activities ? editInitial.activities : [],
    text: editInitial && editInitial.text ? editInitial.text : '',
    anxietyLevel:
      editInitial && editInitial.anxietyLevel ? editInitial.anxietyLevel : 5,
    sleep: editInitial && editInitial.sleep ? editInitial.sleep : 5,
    weather: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnxietyChanged, setIsAnxietyChanged] = useState(null);
  const [isSleepChanged, setIsSleepChanged] = useState(null);

  useEffect(() => {
    if (!editInitial && data && data.user.isSharingLocation) {
      if (currentWeather) {
        // eslint-disable-next-line no-shadow
        setInput((input) => ({ ...input, weather: currentWeather }));
      }
    }
  }, [currentWeather, data, editInitial]);

  const handleView = (newView) => setView(newView);

  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const onMoodSliderChange = (value) => setInput({ ...input, mood: value });

  const onAnxietySliderChange = (value) => {
    setInput({ ...input, anxietyLevel: value });
    setIsAnxietyChanged(true);
  };

  const onSleepSliderChange = (value) => {
    setInput({ ...input, sleep: value });
    setIsSleepChanged(true);
  };

  const addActivities = (activityObject) => {
    const hasActivity = input.activities.some(
      (activity) => activity === activityObject,
    );
    if (hasActivity) {
      const removeActivity = input.activities.filter((obj) => {
        return obj !== activityObject;
      });
      setInput({ ...input, activities: removeActivity });
    } else {
      setInput({ ...input, activities: [...input.activities, activityObject] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!editInitial) {
      // adds mood and refetches mood data
      await addMood({
        variables: {
          userId: data.user.id,
          weather: input.weather,
          activities: input.activities,
          mood: input.mood,
          anxietyLevel: isAnxietyChanged ? input.anxietyLevel : null,
          sleep: isSleepChanged ? input.sleep : null,
          text: input.text.length > 0 ? input.text : null,
        },
        refetchQueries: [
          {
            query: checkForUserAndGetMoodsQuery,
            variables: { email: user.email },
          },
        ],
        awaitRefetchQueries: true,
      });

      // tracks add mood event
      ReactGA.event({
        category: 'Moods',
        action: 'Add mood entry',
      });

      history.push('/dashboard');
    } else {
      // run edit mutation & refetch data
      editMood({
        variables: {
          id: editInitial.id,
          mood: input.mood,
          activities: input.activities,
          anxietyLevel: isAnxietyChanged
            ? input.anxietyLevel
            : editInitial.anxietyLevel,
          sleep: isSleepChanged ? input.sleep : editInitial.sleep,
          text: input.text.length > 0 ? input.text : null,
        },
        refetchQueries: [
          {
            query: checkForUserAndGetMoodsQuery,
            variables: { email: user.email },
          },
        ],
        awaitRefetchQueries: true,
      })
        .then((res) => {
          // tell DayDisplay to stop editing and update with payload
          stopEditing('success', res.data.editMood);
        })
        .catch(() => {
          stopEditing('error', null);
        });
    }
  };

  if (loading) return <LoadingSpinner bgColor="#fafdfc" />;
  if (error) return <p>{error.message}</p>;

  return (
    <StyledForm view={view}>
      {view === 'mood' && (
        <FormMood
          onMoodSliderChange={onMoodSliderChange}
          mood={input.mood}
          handleView={handleView}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          stopEditing={stopEditing}
        />
      )}

      {view === 'anxiety-sleep' && (
        <FormAnxietySleep
          sleep={input.sleep}
          anxietyLevel={input.anxietyLevel}
          onSleepSliderChange={onSleepSliderChange}
          onAnxietySliderChange={onAnxietySliderChange}
          handleView={handleView}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      {view === 'activities' && (
        <Activities
          handleView={handleView}
          handleSubmit={handleSubmit}
          addActivities={addActivities}
          isSubmitting={isSubmitting}
          activitiesToEdit={input.activities}
        />
      )}

      {view === 'journal' && (
        <FormJournal
          text={input.text}
          handleView={handleView}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </StyledForm>
  );
};

FormViews.propTypes = {
  editInitial: PropTypes.shape({
    mood: PropTypes.number.isRequired,
    activities: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    anxietyLevel: PropTypes.number,
    text: PropTypes.string,
    sleep: PropTypes.number,
    weather: PropTypes.string,
  }),
  stopEditing: PropTypes.func,
};

FormViews.defaultProps = {
  editInitial: null,
  stopEditing: null,
};

const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 25px;
  background-color: #fafdfc;

  .ant-slider-track,
  .ant-slider-rail {
    height: 6px;
  }

  .ant-slider-handle {
    height: 16px;
    width: 16px;
  }

  textarea.ant-input::placeholder {
    color: '#658883';
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: baseline;
    position: relative;

    p {
      color: ${styles.darkJungleGreen};
      font-size: 21px;
      font-weight: 600;
      text-align: center;
      margin: 0 auto;
    }

    .back-btn {
      position: absolute;
      left: 4px;
      top: 10px;
      font-size: 22px;
      color: #9cd9dd;
    }
  }

  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export default FormViews;
