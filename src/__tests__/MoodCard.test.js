import React from 'react';
import { render } from '@testing-library/react';
import MoodCard from '../components/MoodCard';

test('MoodCard renders correctly', () => {
  expect(
    render(
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
    ),
  ).toMatchSnapshot();
});
