import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import {
  addMoodMutation,
  getUserIdAndLocation,
  checkForUserAndGetMoodsQuery,
} from '../../queries';
import useCurrentWeather from '../../hooks/useCurrentWeather';
import FormMood from './FormMood';
import FormActivityJournal from './FormActvityJournal';
import FormAnxietySleep from './FormAnxietySleep';
import backgroundImage from '../../assets/background-leaf.svg';
import ladybug from '../../assets/ladybug.svg';

const FormViews = () => {
  const history = useHistory();
  const { currentWeather } = useCurrentWeather();
  const { user } = useAuth0();
  const [addMood] = useMutation(addMoodMutation);
  const { loading, error, data } = useQuery(getUserIdAndLocation, {
    variables: { sub: user.sub },
  });
  const [view, setView] = useState('mood');
  const [input, setInput] = useState({
    mood: 3,
    activities: [],
    text: '',
    anxietyLevel: 5,
    sleep: 5,
    weather: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

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
    <StyledForm view={view}>
      {view === 'mood' && (
        <FormMood
          onMoodSliderChange={onMoodSliderChange}
          mood={input.mood}
          handleView={handleView}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
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

      {view === 'activity-journal' && (
        <FormActivityJournal
          // addActivities={addActivities}
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

const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 25px;
  background-color: #fafdfc;
  background-image: ${(props) =>
    props.view === 'mood'
      ? `url(${backgroundImage})`
      : `url(${backgroundImage}), url(${ladybug})`};
  background-repeat: no-repeat;
  background-position: top -36px right -20px, top 84% right 10%;

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
    justify-content: space-between;
    &.center {
      justify-content: center;
    }

    p {
      color: #0c423b;
      font-size: 21px;
      font-weight: 500;
      line-height: 24px;
      text-align: center;
    }
  }

  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export default FormViews;
