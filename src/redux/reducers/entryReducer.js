import { ADD_ENTRY, GET_ENTRIES } from '../actions/actionTypes';

const initialState = { email: 'jeeef@gmail.com', sub: '8675309' };

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTRY: {
      const { newEntry } = action.payload;
      return {
        ...state,
        newEntry,
      };
    }
    case GET_ENTRIES: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
