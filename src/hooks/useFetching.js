import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useFetching = (actionCreator) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreator());
  }, [actionCreator, dispatch]);
};

export default useFetching;
