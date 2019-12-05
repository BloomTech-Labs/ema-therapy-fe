import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import { useAuth0 } from '../../utils/react-auth0-spa';
import useCurrentWeather from '../../hooks/useCurrentWeather';
import FormMood from './FormMood';
import FormActivityJournal from './FormActvityJournal';
import FormAnxietySleep from './FormAnxietySleep';
import {
  addMoodMutation,
  getUserIdAndLocation,
  checkForUserAndGetMoodsQuery,
} from '../../queries';

const FormViews = () => {
  const history = useHistory();
  const [view, setView] = useState('mood');
  const { currentWeather } = useCurrentWeather();
  const { user } = useAuth0();
  const [addMood] = useMutation(addMoodMutation);
  const { loading, error, data } = useQuery(getUserIdAndLocation, {
    variables: { sub: user.sub },
  });
  const [input, setInput] = useState({
    mood: 3,
    activities: [],
    text: '',
    anxietyLevel: 5,
    sleep: 5,
    weather: null,
  });
  const [isAnxietyChanged, setIsAnxietyChanged] = useState(null);
  const [isSleepChanged, setIsSleepChanged] = useState(null);

  useEffect(() => {
    if (data && data.user.isSharingLocation) {
      if (currentWeather) {
        // eslint-disable-next-line no-shadow
        setInput((input) => ({ ...input, weather: currentWeather }));
      }
    }
  }, [currentWeather, data]);

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

  // const addActivities = (activityObject) => {
  //   const hasActivity = input.activities.some(
  //     (activity) => activity.type === activityObject.type,
  //   );
  //   if (hasActivity) {
  //     const removeActivity = input.activities.filter((obj) => {
  //       return obj.type !== activityObject.type;
  //     });
  //     setInput({ ...input, activities: removeActivity });
  //   } else {
  //     setInput({ ...input, activities: [...input.activities, activityObject] });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // adds mood and refetches mood data
    await addMood({
      variables: {
        userId: data.user.id,
        weather: input.weather,
        mood: input.mood,
        anxietyLevel: isAnxietyChanged ? input.anxietyLevel : null,
        sleep: isSleepChanged ? input.sleep : null,
        text: input.text.length > 0 ? input.text : null,
      },
      refetchQueries: [
        {
          query: checkForUserAndGetMoodsQuery,
          variables: { sub: user.sub },
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
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <StyledForm>
      {view === 'mood' && (
        <FormMood
          onMoodSliderChange={onMoodSliderChange}
          mood={input.mood}
          handleView={handleView}
          handleSubmit={handleSubmit}
        />
      )}

      {view === 'anxiety-sleep' && (
        <FormAnxietySleep
          handleView={handleView}
          handleChange={handleChange}
          onAnxietySliderChange={onAnxietySliderChange}
          onSleepSliderChange={onSleepSliderChange}
          anxietyLevel={input.anxietyLevel}
          sleep={input.sleep}
          handleSubmit={handleSubmit}
        />
      )}

      {view === 'activity-journal' && (
        <FormActivityJournal
          // addActivities={addActivities}
          handleView={handleView}
          handleChange={handleChange}
          text={input.text}
          handleSubmit={handleSubmit}
        />
      )}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Fira Sans', sans-serif;

  .header {
    display: flex;
    justify-content: space-between;
    &.center {
      justify-content: center;
    }

    p {
      color: #0c423b;
      font-size: 21px;
      line-height: 24px;
      text-align: center;
    }
  }

  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 40px;
  }
`;

export default FormViews;
