import React from 'react';
import { render } from '@testing-library/react';
import MoodPreview from '../components/MoodPreview';

const mockMoodPreview = (
  <MoodPreview
    lastItem={{
      mood: 1,
      id: 'mockId',
      sleep: 1,
      anxietyLevel: 1,
      text: 'mockText',
      createdAt: '1575270000000', // Monday, December 2, 2019 1:00:00 AM (CST)
      weather: 'mockWeather',
    }}
    count={1}
  />
);
describe('MoodPreview component', () => {
  test('renders without crashing', () => {
    render(mockMoodPreview);
  });

  test('matches snapshot', () => {
    expect(render(mockMoodPreview)).toMatchSnapshot();
  });
});
