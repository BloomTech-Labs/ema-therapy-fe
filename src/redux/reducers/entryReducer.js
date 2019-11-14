import { ADD_ENTRY, GET_ENTRIES } from '../actions/actionTypes';

const initialState = [];

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
