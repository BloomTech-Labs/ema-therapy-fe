import React, { createContext, useState } from 'react';

export const MoodsPrevWeekContext = createContext({
  moods: [],
  setMoods: () => {},
});

export const MoodsPrevWeekProvider = ({ children }) => {
  const [state, setState] = useState({
    moods: null,
    setMoods: (moods) => {
      setState({ ...state, moods });
    },
  });

  return (
    <MoodsPrevWeekContext.Provider value={state}>
      {children}
    </MoodsPrevWeekContext.Provider>
  );
};
