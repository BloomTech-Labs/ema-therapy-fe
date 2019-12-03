import React from 'react';
import FormActivityJournal from '../components/FormActvityJournal';
import renderer, { act } from 'react-test-renderer';
import 'jest-styled-components';
import { exact } from 'prop-types';

describe('FormActivityJournal component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <FormActivityJournal
          handleView={() => {}}
          addActivities={() => {}}
          handleChange={() => {}}
          text={'testString'}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handleView gets called with correct string when clicking back button', () => {
    const handleViewMock = jest.fn();
    const tree = renderer.create(
      <FormActivityJournal
        handleView={handleViewMock}
        addActivities={() => {}}
        handleChange={() => {}}
        text={'testString'}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    act(() => {
      tree.root
        .find((element) => element.props.className === 'back')
        .props.onClick();
    });
    expect(handleViewMock.mock.calls.length).toBe(1);
    expect(handleViewMock.mock.calls[0][0]).toEqual('mood');
  });

  it('handleChange gets called when text is entered into the text field', () => {
    const handleChangeMock = jest.fn();
    const tree = renderer.create(
      <FormActivityJournal
        handleView={() => {}}
        addActivities={() => {}}
        handleChange={handleChangeMock}
        text={'testString'}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    act(() => {
      tree.root
        .find((element) => element.props.type === 'text')
        .props.onChange();
    });
    expect(handleChangeMock.mock.calls.length).toBe(1);
  });

  it('handleView gets called with correct string when clicking anxiety-sleep button', () => {
    const handleViewMock = jest.fn();
    const tree = renderer.create(
      <FormActivityJournal
        handleView={handleViewMock}
        addActivities={() => {}}
        handleChange={() => {}}
        text={'testString'}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    act(() => {
      tree.root
        .find(
          (element) =>
            element.props.className === 'main-button' &&
            element.props.type === 'button',
        )
        .props.onClick();
    });
    expect(handleViewMock.mock.calls.length).toBe(1);
    expect(handleViewMock.mock.calls[0][0]).toEqual('anxiety-sleep');
  });
});
