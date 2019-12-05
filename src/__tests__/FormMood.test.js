import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import FormMood from '../components/FormMood';
import 'jest-styled-components';

describe('FormMood component', () => {
  test('renders correctly', () => {
    expect(
      render(
        <Router>
          <FormMood
            onMoodSliderChange={() => {}}
            handleView={() => {}}
            mood={5}
          />
        </Router>,
      ),
    ).toMatchSnapshot();
  });

  test('next button calls onClick handleView', () => {
    const handleViewMock = jest.fn();

    const { getByTestId } = render(
      <Router>
        <FormMood
          onMoodSliderChange={() => {}}
          handleView={handleViewMock}
          mood={5}
        />
      </Router>,
    );

    fireEvent.click(getByTestId('next'));
    expect(handleViewMock).toHaveBeenCalledWith('activity-journal');
  });
});
