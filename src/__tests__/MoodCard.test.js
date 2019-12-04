import React from 'react';
import renderer from 'react-test-renderer';
import MoodCard from '../components/MoodCard';

test('MoodCard renders correctly', () => {
  const tree = renderer
    .create(
      <MoodCard
        mood={{
          mood: 1,
          id: 'mockId',
          sleep: 1,
          anxietyLevel: 1,
          text: 'mockText',
          createdAt: Date.UTC(2000).toString(),
          weather: 'mockWeather',
        }}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
