import React from 'react';
import { render } from '@testing-library/react';
import Activities from '../components/FormViews/Activities';
import 'jest-styled-components';

test('renders correctly', () => {
  expect(render(<Activities addActivities={() => {}} />)).toMatchSnapshot();
});
