import { gql } from 'apollo-boost';

export const getMoodsQuery = gql`
  query($id: ID) {
    user(id: $id) {
      moods {
        mood
        intensity
      }
    }
  }
`;

export const addUserMutation = gql`
  mutation($email: String!, $sub: String!) {
    addUser(email: $email, sub: $sub) {
      email
    }
  }
`;
