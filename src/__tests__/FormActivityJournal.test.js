import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormActivityJournal from '../components/FormActvityJournal';
import 'jest-styled-components';

describe('FormActivityJournal component', () => {
  test('renders correctly', () => {
    expect(
      render(
        <FormActivityJournal
          handleView={() => {}}
          addActivities={() => {}}
          handleChange={() => {}}
          text="testString"
        />,
      ),
    ).toMatchSnapshot();
  });
  test('changes view to mood on back button', () => {
    const handleViewMock = jest.fn();

    const { getByTestId } = render(
      <FormActivityJournal
        handleView={handleViewMock}
        addActivities={() => {}}
        handleChange={() => {}}
        text="testString"
      />,
    );

    const backButton = getByTestId('back');
    fireEvent.click(backButton);
    expect(handleViewMock).toHaveBeenLastCalledWith('mood');
  });
  // check to see if on change was called and if we need to keep recreating this mocked render every time
  test('handleChange gets called when text is entered into the text field', () => {
    const handleViewMock = jest.fn();

    const { getByTestId } = render(
      <FormActivityJournal
        handleView={handleViewMock}
        addActivities={() => {}}
        handleChange={() => {}}
        text="testString"
      />,
    );
  });
});

//   it('handleChange gets called when text is entered into the text field', () => {
//     const handleChangeMock = jest.fn();
//     const tree = renderer.create(
//       <FormActivityJournal
//         handleView={() => { }}
//         addActivities={() => { }}
//         handleChange={handleChangeMock}
//         text={'testString'}
//       />,
//     );
//     expect(tree.toJSON()).toMatchSnapshot();
//     act(() => {
//       tree.root
//         .find((element) => element.props.type === 'text')
//         .props.onChange();
//     });
//     expect(handleChangeMock.mock.calls.length).toBe(1);
//   });

//   it('handleView gets called with correct string when clicking anxiety-sleep button', () => {
//     const handleViewMock = jest.fn();
//     const tree = renderer.create(
//       <FormActivityJournal
//         handleView={handleViewMock}
//         addActivities={() => { }}
//         handleChange={() => { }}
//         text={'testString'}
//       />,
//     );
//     expect(tree.toJSON()).toMatchSnapshot();
//     act(() => {
//       tree.root
//         .find(
//           (element) =>
//             element.props.className === 'main-button' &&
//             element.props.type === 'button',
//         )
//         .props.onClick();
//     });
//     expect(handleViewMock.mock.calls.length).toBe(1);
//     expect(handleViewMock.mock.calls[0][0]).toEqual('anxiety-sleep');
//   });
// });
