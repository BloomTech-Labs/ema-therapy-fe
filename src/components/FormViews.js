import React, { useState, useEffect } from 'react';
import Slider from 'antd/es/slider';
import 'antd/dist/antd.css';
import 'rc-slider/assets/index.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '../utils/react-auth0-spa';
import { addMoodMutation } from '../queries';
import Activities from './Activities';
import useWeather from '../hooks/getWeatherLocationHook';

const getUserIdAndLocation = gql`
  query($sub: ID) {
    user(sub: $sub) {
      isSharingLocation
      id
    }
  }
`;

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
      {/* Insert link to dashboard here */}
      {/* <button type="button" onClick={}></button> */}

      {view === 'mood' && (
        <MoodView>
          {/* questions */}
          <div className="header">
            <Link to="/dashboard">
              <button type="button" className="back">
                &larr;
              </button>
            </Link>
            <p>How do you feel?</p>
            <button className="main-button" type="submit">
              Done
            </button>
          </div>
          <div className="inputs">
            <Slider
              // defaultValue={3}
              value={input.mood}
              onChange={onMoodSliderChange}
              min={1}
              max={5}
            />
          </div>
          <div className="footer">
            <button
              className="main-button"
              type="button"
              onClick={() => handleView('activity-journal')}
            >
              Next
            </button>
          </div>
        </MoodView>
      )}

      {view === 'activity-journal' && (
        <MoodView>
          <div className="header">
            <button
              type="button"
              className="back"
              onClick={() => handleView('mood')}
            >
              &larr;
            </button>
            <p>What have you been up to?</p>
            <button className="main-button" type="submit">
              Done
            </button>
          </div>
          <Activities addActivities={addActivities} />
          <div className="input-section">
            <div className="inputs">
              <textarea
                type="text"
                name="text"
                placeholder="write your thoughts here"
                value={input.text}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="footer">
            <button
              type="button"
              className="main-button"
              onClick={() => handleView('anxiety-sleep')}
            >
              Next
            </button>
          </div>
        </MoodView>
      )}

      {view === 'anxiety-sleep' && (
        <MoodView>
          <div className="header">
            <button
              type="button"
              className="back"
              onClick={() => handleView('activity-journal')}
            >
              &larr;
            </button>
            <p>How stressed are you this moment from 1 - 10?</p>
          </div>
          <div className="inputs-section">
            <div className="inputs">
              <p>Anxiety Level</p>
              <Slider
                value={input.anxietyLevel}
                onChange={onAnxietySliderChange}
                min={1}
                max={10}
              />
            </div>
            <div className="inputs">
              <label htmlFor="sleep">
                Hours of sleep:
                <input
                  type="number"
                  name="sleep"
                  id="sleep"
                  value={input.sleep}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="footer">
            <button className="main-button" type="submit">
              Done
            </button>
          </div>
        </MoodView>
      )}
    </form>
  );
};

const MoodView = styled.div`
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
