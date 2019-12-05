import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormActivityJournal from '../components/FormActvityJournal';
import 'jest-styled-components';

describe('FormActivityJournal component', () => {
  test('renders correctly', () => {
    expect(
      render(
        <FormActivityJournal
          handleView={() => {}}
          addActivities={() => {}}
          handleChange={() => {}}
          text="testString"
        />,
      ),
    ).toMatchSnapshot();
  });
  test('changes view to mood on back button', () => {
    const handleViewMock = jest.fn();
    const { getByTestId } = render(
      <FormActivityJournal
        handleView={handleViewMock}
        addActivities={() => {}}
        handleChange={() => {}}
        text="testString"
      />,
    );
    const backButton = getByTestId('back');
    fireEvent.click(backButton);
    expect(handleViewMock).toHaveBeenLastCalledWith('mood');
  });
  test('handleChange gets called when text is entered into the text field', () => {
    const handleChangeMock = jest.fn();
    const { getByTestId } = render(
      <FormActivityJournal
        handleView={() => {}}
        addActivities={() => {}}
        handleChange={handleChangeMock}
        text="Good Day"
      />,
    );
    const textChange = getByTestId('text');
    expect(textChange.value).toBe('Good Day');
  });
  test('changes view to mood on back button', () => {
    const handleViewMock = jest.fn();
    const { getByTestId } = render(
      <FormActivityJournal
        handleView={handleViewMock}
        addActivities={() => {}}
        handleChange={() => {}}
        text="testString"
      />,
    );
    const backButton = getByTestId('back');
    fireEvent.click(backButton);
    expect(handleViewMock).toHaveBeenLastCalledWith('mood');
  });
  test('changes view to anxiety-sleep after pressing Next button', () => {
    const handleViewMock = jest.fn();
    const { getByText } = render(
      <FormActivityJournal
        handleView={handleViewMock}
        addActivities={() => {}}
        handleChange={() => {}}
        text="testString"
      />,
    );
    const nextButton = getByText(/next/i);
    fireEvent.click(nextButton);
    expect(handleViewMock).toHaveBeenLastCalledWith('anxiety-sleep');
  });
});
