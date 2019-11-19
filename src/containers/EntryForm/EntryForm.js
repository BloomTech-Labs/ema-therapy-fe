import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useAuth0 } from '../../utils/react-auth0-spa';
import { gql } from 'apollo-boost';
import { addMoodMutation } from '../../queries';

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

const EntryForm = () => {
  const [input, setInput] = useState({
    mood: 3,
    activities: [],
    text: '',
    anxietyLevel: 5,
    sleep: 2,
  });
  const [view, setView] = useState('mood');

  const { user } = useAuth0();

  const { loading, error, data } = useQuery(getUserId, {
    variables: { sub: user.sub },
  });

  const [addMood, { data: moodData }] = useMutation(addMoodMutation);

  // console.log(input);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onMoodSliderChange = (value) => {
    setInput({ ...input, mood: value });
  };

  const onAnxietySliderChange = (value) => {
    // console.log(value);
    setInput({ ...input, anxietyLevel: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(input.mood);
    addMood({ variables: { userId: data.user.id, mood: input.mood } });
  };

  console.log('moodData', moodData);

  const handleView = (newView) => {
    setView(newView);
  };

  // console.log(data);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error fetching.</p>;

  return (
    <form onSubmit={submitForm}>
      {/* Insert link to dashboard here */}
      {/* <button type="button" onClick={}></button> */}

      {view === 'mood' && (
        <div className="mood">
          <p>MOOD</p>
          <Slider
            value={input.mood}
            onChange={onMoodSliderChange}
            min={1}
            max={5}
          />
          <button type="button" onClick={() => handleView('activity-journal')}>
            Next
          </button>
          <button type="submit">Done</button>
        </div>
      )}

      {view === 'activity-journal' && (
        <div className="activity-journal">
          <button type="button" onClick={() => handleView('mood')}>
            &larr;
          </button>
          <p>activities</p>
          <p>journal</p>
          <textarea
            type="text"
            name="text"
            placeholder="write your text here"
            value={input.text}
            onChange={handleChange}
          />
          <button type="button" onClick={() => handleView('anxiety-sleep')}>
            Next
          </button>
          <button type="submit">Done</button>
        </div>
      )}

      {view === 'anxiety-sleep' && (
        <div className="anxiety-sleep">
          <button type="button" onClick={() => handleView('activity-journal')}>
            &larr;
          </button>
          <Slider
            value={input.anxietyLevel}
            onChange={onAnxietySliderChange}
            min={1}
            max={10}
          />
          <label>
            Hours of sleep:
            <input
              type="text"
              name="sleep"
              value={input.sleep}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Done</button>
        </div>
      )}
    </form>
  );
};

export default EntryForm;
