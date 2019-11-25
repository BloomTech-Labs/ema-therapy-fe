import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { useAuth0 } from '../utils/react-auth0-spa';
import { addMoodMutation } from '../queries';

const getUserId = gql`
  query($sub: ID) {
    user(sub: $sub) {
      id
    }
  }
`;

const activities = [
  {
    name: 'food',
    foods: [
      { foodType: 'meat', icon: 'meat-icon' },
      { foodType: 'fruit', icon: 'fruit-icon' },
    ],
  },
  {
    name: 'drink',
    drinks: [
      { drinkType: 'juice', icon: 'juice-icon' },
      { drinkType: 'alcohol', icon: 'alcohol-icon' },
    ],
  },
  {
    name: 'fun',
    funs: [
      { funType: 'games', icon: 'game-icon' },
      { funType: 'party', icon: 'party-icon' },
    ],
  },
  {
    name: 'misc',
    miscs: [
      { miscType: 'gambling', icon: 'gambling-icon' },
      { miscType: 'movies', icon: 'movie-icon' },
    ],
  },
  {
    name: 'leisure',
    leisures: [
      { leisureType: 'swimming', icon: 'swimming-icon' },
      { leisureType: 'basketball', icon: 'basketball-icon' },
    ],
  },
];

const FormViews = () => {
  const [input, setInput] = useState({
    mood: 3,
    activities: undefined,
    text: '',
    anxietyLevel: 5,
    sleep: '',
  });
  const [view, setView] = useState('mood');

  const { loading: userLoading, error: userError, user } = useAuth0();

  console.log(user);

  const { loading, error, data } = useQuery(getUserId, {
    variables: { sub: user.sub },
  });

  const [addMood, { data: moodData }] = useMutation(addMoodMutation);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onMoodSliderChange = (value) => {
    setInput({ ...input, mood: value });
  };

  const onAnxietySliderChange = (value) => {
    setInput({ ...input, anxietyLevel: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (view === 'mood') {
      addMood({
        variables: {
          userId: data.user.id,
          mood: input.mood,
          text: null,
          anxietyLevel: null,
          sleep: null,
        },
      });
    } else if (view === 'activities-journal') {
      addMood({
        variables: {
          userId: data.user.id,
          mood: input.mood,
          text: input.text,
          anxietyLevel: null,
          sleep: null,
        },
      });
    } else {
      addMood({
        variables: {
          userId: data.user.id,
          mood: input.mood,
          text: input.text,
          anxietyLevel: input.anxietyLevel,
          sleep: parseFloat(input.sleep),
        },
      });
    }
  };

  console.log('moodData', moodData);

  const handleView = (newView) => {
    setView(newView);
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error fetching.</p>;
  if (userError) return <p>Loading ...</p>;

  return (
    <form onSubmit={submitForm}>
      {/* Insert link to dashboard here */}
      {/* <button type="button" onClick={}></button> */}

      {view === 'mood' && (
        <MoodView>
          {/* questions */}
          <div className="header">
            <button type="button" className="back">
              &larr;
            </button>
            <p>How do you feel?</p>
            <button type="submit">Done</button>
          </div>
          <div className="inputs">
            <Slider
              value={input.mood}
              onChange={onMoodSliderChange}
              min={1}
              max={5}
            />
          </div>
          <div className="footer">
            <button
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
            <button type="submit">Done</button>
          </div>
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
            <button type="button" onClick={() => handleView('anxiety-sleep')}>
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
              <label>
                Hours of sleep:
                <input
                  type="number"
                  name="sleep"
                  value={input.sleep}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="footer">
            <button type="submit">Done</button>
          </div>
        </MoodView>
      )}
    </form>
  );
};

const MoodView = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 25px;
    padding: 0 25px;
  }

  button {
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
