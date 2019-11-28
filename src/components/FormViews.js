import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import 'rc-slider/assets/index.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '../utils/react-auth0-spa';
import { addMoodMutation, getUserIdAndLocation } from '../queries';
import useWeather from '../hooks/getWeatherLocationHook';
import FormMood from './FormMood';
import FormActivityJournal from './FormActvityJournal';
import FormAnxietySleep from './FormAnxietySleep';

const FormViews = () => {
  const history = useHistory();
  const [view, setView] = useState('mood');
  const { finalTemp } = useWeather();
  const { user } = useAuth0();

  const [addMood] = useMutation(addMoodMutation);

  const { loading, error, data } = useQuery(getUserIdAndLocation, {
    variables: { sub: user.sub },
  });

  const [input, setInput] = useState({
    mood: 3,
    activities: [],
    text: '', // `value` prop on `textarea` should not be null.
    anxietyLevel: 5,
    sleep: '',
    weather: null,
  });

  useEffect(() => {
    if (data && data.user.isSharingLocation) {
      if (typeof finalTemp === 'string') {
        // eslint-disable-next-line no-shadow
        setInput((input) => ({ ...input, weather: finalTemp }));
      }
    }
  }, [finalTemp, data]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onMoodSliderChange = (value) => {
    setInput({ ...input, mood: value });
  };

  const onAnxietySliderChange = (value) => {
    setInput({ ...input, anxietyLevel: value });
  };

  const addActivities = (activityObject) => {
    const hasActivity = input.activities.some(
      (activity) => activity.type === activityObject.type,
    );
    if (hasActivity) {
      const removeActivity = input.activities.filter((obj) => {
        return obj.type !== activityObject.type;
      });
      setInput({ ...input, activities: removeActivity });
    } else {
      setInput({ ...input, activities: [...input.activities, activityObject] });
    }
  };

  const handleView = (newView) => {
    setView(newView);
  };

  const submitForm = (e) => {
    e.preventDefault();
    addMood({
      variables: {
        userId: data.user.id,
        weather: input.weather,
        mood: input.mood,
        anxietyLevel: view === 'anxiety-sleep' ? input.anxietyLevel : null,
        // if input.text is an empty string, pass null
        text: input.text.length > 0 ? input.text : null,
        // convert sleep from a string to a number as long as it is not an empty string
        sleep: input.sleep !== '' ? +input.sleep : null,
      },
    });
    history.push('/dashboard');
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error fetching.</p>;
  // if (userError) return <p>Loading ...</p>;

  return (
    <form onSubmit={submitForm}>
      {view === 'mood' && (
        <FormContainer>
          {/* questions */}
          <FormMood
            onMoodSliderChange={onMoodSliderChange}
            mood={input.mood}
            handleView={handleView}
          />
        </FormContainer>
      )}

      {view === 'activity-journal' && (
        <FormContainer>
          <FormActivityJournal
            handleView={handleView}
            handleChange={handleChange}
            addActivities={addActivities}
            text={input.text}
          />
        </FormContainer>
      )}

      {view === 'anxiety-sleep' && (
        <FormContainer>
          <FormAnxietySleep
            handleView={handleView}
            handleChange={handleChange}
            onAnxietySliderChange={onAnxietySliderChange}
            anxietyLevel={input.anxietyLevel}
            sleep={input.sleep}
          />
        </FormContainer>
      )}
    </form>
  );
};

const FormContainer = styled.div`
  a {
    text-decoration: none;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 25px;
    padding: 0 25px;
  }

  .main-button {
    height: 35px;
    width: 120px;
    font-size: 14px;
    border: none;
    border-radius: 3px;
    color: #000;
    background-color: darkgrey;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .back {
    background-color: transparent;
    font-size: 32px;
    width: 30px;
  }

  .inputs {
    margin: 15% 5%;
    padding: 25px;
  }

  .inputs input {
    margin-left: 5px;
    height: 30px;
    width: 70px;
  }

  .input-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50%;
  }

  textarea {
    height: 200px;
    width: 400px;
  }

  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 25px;
    width: 100%;
    position: fixed;
    bottom: 0;
    max-width: 500px;
  }
`;

export default FormViews;
