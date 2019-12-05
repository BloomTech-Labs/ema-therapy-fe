import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormAnxietySleep from '../components/FormAnxietySleep';
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
          sleep="testString"
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
        handleChange={() => {}}
        sleep="testString"
      />,
    );
    const backButton = getByTestId('back');
    fireEvent.click(backButton);
    expect(handleViewMock).toHaveBeenLastCalledWith('activity-journal');
  });
});
test('onAnxietySliderChange gets called when slider is moved', () => {
  const antSlider = jest.fn();
  const { getByRole } = render(
    <FormAnxietySleep
      handleView={() => {}}
      anxietyLevel={7}
      onAnxietySliderChange={antSlider}
      handleChange={() => {}}
      sleep="testString"
    />,
  );
  const moveSlider = getByRole('slider');
  fireEvent.mouseDown(moveSlider);
  expect(antSlider).toHaveBeenCalled();
});
test('handleChange gets called when a number is entered into the sleep hours field', () => {
  const handleChangeMock = jest.fn();
  const { getByTestId } = render(
    <FormAnxietySleep
      handleView={() => {}}
      anxietyLevel={7}
      onAnxietySliderChange={() => {}}
      handleChange={handleChangeMock}
      sleep="5"
    />,
  );
  const sleepInput = getByTestId('sleep');
  expect(sleepInput.value).toBe('5');
});
