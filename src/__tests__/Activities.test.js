import React from 'react';
import renderer from 'react-test-renderer';
import Activities from '../components/FormViews/Activities';
import 'jest-styled-components';

describe('Activities component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Activities addActivities={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
