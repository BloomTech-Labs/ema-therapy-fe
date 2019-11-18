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

export const checkForUserAndGetMoodsQuery = gql`
  query($sub: ID, $email: String) {
    user(sub: $sub, email: $email) {
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
