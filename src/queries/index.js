import { gql } from 'apollo-boost';

export const getMoodsQuery = gql`
  query($sub: ID) {
    user(sub: $sub) {
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
