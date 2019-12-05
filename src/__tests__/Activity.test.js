import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Activity from '../components/FormViews/Activity';
import 'jest-styled-components';

describe('Activity component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Activity
          addActivities={() => {}}
          activityType={{ icon: 'mockIcon', type: 'mockType' }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles click', () => {
    const addActivitiesMock = jest.fn();
    const activityTypeMock = { icon: 'mockIcon', type: 'mockType' };
    const tree = renderer.create(
      <Activity
        addActivities={addActivitiesMock}
        activityType={activityTypeMock}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();

    act(() => {
      tree.root.find((element) => element.type === 'button').props.onClick();
    });
    expect(addActivitiesMock.mock.calls.length).toBe(1);
    expect(addActivitiesMock.mock.calls[0][0]).toEqual(activityTypeMock);
    // adding another snapshot since toggle changes color
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
