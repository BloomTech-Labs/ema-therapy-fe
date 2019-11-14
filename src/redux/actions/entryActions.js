import { ADD_ENTRY, GET_ENTRIES } from './actionTypes';

export const addEntry = (entry) => ({
  type: ADD_ENTRY,
  payload: entry,
});

export const getEntries = () => ({
  type: GET_ENTRIES,
});
