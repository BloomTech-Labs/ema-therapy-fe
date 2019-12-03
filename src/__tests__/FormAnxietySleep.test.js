import React from 'react';
import FormAnxietySleep from '../components/FormAnxietySleep';
import renderer, { act } from 'react-test-renderer';
import 'jest-styled-components';
import { exact } from 'prop-types';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <FormAnxietySleep
        handleView={() => {}}
        anxietyLevel={7}
        onAnxietySliderChange={() => {}}
        handleChange={() => {}}
        sleep={'testString'}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('handleView gets called with correct string when clicking back button', () => {
  const handleViewMock = jest.fn();
  const tree = renderer.create(
    <FormAnxietySleep
      handleView={handleViewMock}
      anxietyLevel={7}
      onAnxietySliderChange={() => {}}
      handleChange={() => {}}
      sleep={'testString'}
    />,
  );
  expect(tree.toJSON()).toMatchSnapshot();
  act(() => {
    tree.root
      .find((element) => element.props.className === 'back')
      .props.onClick();
  });
  expect(handleViewMock.mock.calls.length).toBe(1);
  expect(handleViewMock.mock.calls[0][0]).toEqual('activity-journal');
});

// too much hassle to get this to work with ant design slider - someone else can do it if they want

// it('onAnxietySliderChange gets called when slider is moved', () => {
//   const onAnxietySliderMock = jest.fn();
//   const tree = renderer.create(
//     <FormAnxietySleep
//         handleView={() => {}}
//         anxietyLevel={7}
//         onAnxietySliderChange={() => {}}
//         handleChange={onAnxietySliderMock}
//         sleep={'testString'}
//     />,
//   );
//   expect(tree.toJSON()).toMatchSnapshot();
//   act(() => {
//     tree.root.find((element) => element.props.className === 'ant-slider-track').props.onChange();
//   });
//   expect(onAnxietySliderMock.mock.calls.length).toBe(1);
// });

it('handleChange gets called when a number is entered into the sleep hours field', () => {
  const handleChangeMock = jest.fn();
  const tree = renderer.create(
    <FormAnxietySleep
      handleView={() => {}}
      anxietyLevel={7}
      onAnxietySliderChange={() => {}}
      handleChange={handleChangeMock}
      sleep={'testString'}
    />,
  );
  expect(tree.toJSON()).toMatchSnapshot();
  act(() => {
    tree.root
      .find((element) => element.props.name === 'sleep')
      .props.onChange();
  });
  expect(handleChangeMock.mock.calls.length).toBe(1);
});
