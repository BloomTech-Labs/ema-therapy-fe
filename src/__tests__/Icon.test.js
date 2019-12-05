import React from 'react';
import { render } from '@testing-library/react';
import Icon from '../components/Icon';
import 'jest-styled-components';

describe('Icon component', () => {
  test('renders correctly', () => {
    expect(render(<Icon icon="testString" />)).toMatchSnapshot();
  });
});
