import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormAnxietySleep from '../components/FormViews/FormAnxietySleep';
import 'jest-styled-components';

describe('FormAnxietySleep component', () => {
  test('renders correctly', () => {
    expect(
      render(
        <FormAnxietySleep
          handleView={() => {}}
          anxietyLevel={7}
          onAnxietySliderChange={() => {}}
          handleChange={() => {}}
          onSleepSliderChange={() => {}}
          handleSubmit={() => {}}
          isSubmitting
          sleep={5}
        />,
      ),
    ).toMatchSnapshot();
  });
  test('changes view to activity-journal on back button', () => {
    const handleViewMock = jest.fn();
    const { getByTestId } = render(
      <FormAnxietySleep
        handleView={handleViewMock}
        anxietyLevel={7}
        onAnxietySliderChange={() => {}}
        onSleepSliderChange={() => {}}
        handleChange={() => {}}
        handleSubmit={() => {}}
        isSubmitting
        sleep={5}
      />,
    );
    const backButton = getByTestId('back');
    fireEvent.click(backButton);
    expect(handleViewMock).toHaveBeenLastCalledWith('mood');
  });
});
test('onAnxietySliderChange gets called when slider is moved', () => {
  const antSlider = jest.fn();
  const { getAllByRole } = render(
    <FormAnxietySleep
      handleView={() => {}}
      anxietyLevel={7}
      onAnxietySliderChange={antSlider}
      handleChange={() => {}}
      onSleepSliderChange={() => {}}
      handleSubmit={() => {}}
      isSubmitting
      sleep={5}
    />,
  );
  const moveSlider = getAllByRole('slider');
  fireEvent.mouseDown(moveSlider[0]);
  expect(antSlider).toHaveBeenCalled();
});
test('sleep number changes when sleep slider moves', () => {
  const antSliderSleep = jest.fn();
  const { getAllByRole } = render(
    <FormAnxietySleep
      handleView={() => {}}
      anxietyLevel={7}
      onAnxietySliderChange={() => {}}
      onSleepSliderChange={antSliderSleep}
      handleSubmit={() => {}}
      isSubmitting
      sleep={5}
    />,
  );
  const moveSlider = getAllByRole('slider');
  fireEvent.mouseDown(moveSlider[1]);
  expect(antSliderSleep).toHaveBeenCalled();
});
