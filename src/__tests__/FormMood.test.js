import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import FormMood from '../components/FormViews/FormMood';
import 'jest-styled-components';

describe('FormMood component', () => {
  test('renders correctly', () => {
    expect(
      render(
        <Router>
          <FormMood
            onMoodSliderChange={() => {}}
            handleView={() => {}}
            handleSubmit={() => {}}
            isSubmitting
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
          handleSubmit={() => {}}
          isSubmitting
          mood={5}
        />
      </Router>,
    );
    fireEvent.click(getByTestId('next'));
    expect(handleViewMock).toHaveBeenCalledWith('anxiety-sleep');
  });
});
