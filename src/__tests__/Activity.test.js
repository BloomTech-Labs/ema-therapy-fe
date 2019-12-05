import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Activity from '../components/FormViews/Activity';
import 'jest-styled-components';

describe('Activity component', () => {
  test('renders correctly', () => {
    expect(
      render(
        <Activity
          addActivities={() => {}}
          activityType={{ icon: 'mockIcon', type: 'mockType' }}
        />,
      ),
    ).toMatchSnapshot();
  });
  test('handles click', () => {
    const addActivitiesMock = jest.fn();
    const activityTypeMock = { icon: 'mockIcon', type: 'mockType' };
    const { getByTestId } = render(
      <Activity
        addActivities={addActivitiesMock}
        activityType={activityTypeMock}
      />,
    );
    fireEvent.click(getByTestId('toggle'));
    expect(addActivitiesMock).toHaveBeenCalled();
  });
});
