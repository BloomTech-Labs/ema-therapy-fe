import React from 'react';
import Activities from '../components/Activities';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

describe('Activities component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Activities addActivities={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
