import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormActivityJournal from '../components/FormViews/FormActvityJournal';
import 'jest-styled-components';

describe('FormActivityJournal component', () => {
  test('renders correctly', () => {
    expect(
      render(
        <FormActivityJournal
          handleView={() => {}}
          addActivities={() => {}}
          handleChange={() => {}}
          handleSubmit={() => {}}
          // eslint-disable-next-line react/jsx-boolean-value
          isSubmitting={true}
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
        handleSubmit={() => {}}
        isSubmitting={true}
        text="testString"
      />,
    );
    const backButton = getByTestId('back');
    fireEvent.click(backButton);
    expect(handleViewMock).toHaveBeenLastCalledWith('anxiety-sleep');
  });
  test('handleChange gets called when text is entered into the text field', () => {
    const handleChangeMock = jest.fn();
    const { getByTestId } = render(
      <FormActivityJournal
        handleView={() => {}}
        addActivities={() => {}}
        handleChange={handleChangeMock}
        handleSubmit={() => {}}
        isSubmitting={true}
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
        handleSubmit={() => {}}
        // eslint-disable-next-line react/jsx-boolean-value
        isSubmitting={true}
        text="testString"
      />,
    );
    const backButton = getByTestId('back');
    fireEvent.click(backButton);
    expect(handleViewMock).toHaveBeenLastCalledWith('anxiety-sleep');
  });
  test('changes view to anxiety-sleep after pressing Next button', () => {
    const handleSubmitMock = jest.fn();
    const { getByText } = render(
      <FormActivityJournal
        handleView={() => {}}
        addActivities={() => {}}
        handleChange={() => {}}
        handleSubmit={handleSubmitMock}
        // eslint-disable-next-line react/jsx-boolean-value
        isSubmitting={true}
        text="testString"
      />,
    );
    const nextButton = getByText(/Done/i);
    fireEvent.click(nextButton);
  });
});
