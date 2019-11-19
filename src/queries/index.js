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

export const addMoodMutation = gql`
  mutation(
    $userId: ID!
    $mood: String!
    $text: String
    $anxietyLevel: Int
    $sleep: Float
  ) {
    addMood(
      userId: $userId
      mood: $mood
      text: $text
      anxietyLevel: $anxietyLevel
      sleep: $sleep
    ) {
      mood
      text
      anxietyLevel
      sleep
    }
  }
`;

export const checkForUserAndGetMoodsQuery = gql`
  query($sub: ID, $email: String, $firstName: String, $lastName: String) {
    user(sub: $sub, email: $email, firstName: $firstName, lastName: $lastName) {
      sub
      email
      firstName
      lastName
      id
      moods {
        mood
        anxietyLevel
        text
        sleep
        createdAt
        id
      }
    }
  }
`;

export const addUserMutation = gql`
  mutation(
    $email: String!
    $sub: String!
    $firstName: String
    $lastName: String
  ) {
    addUser(
      email: $email
      sub: $sub
      firstName: $firstName
      lastName: $lastName
    ) {
      email
      sub
      firstName
      lastName
      createdAt
      id
    }
  }
`;
