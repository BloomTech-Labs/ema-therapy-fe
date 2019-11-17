import React from 'react';
import { addUserMutation } from '../queries';
import { useMutation } from '@apollo/react-hooks';

function AddUser({ email, sub }) {
  const [addUser, { data }] = useMutation(addUserMutation);

  return (
    <button onClick={() => addUser({ variables: { email: email, sub: sub } })}>
      Add User to db
    </button>
  );
}

export default AddUser;
