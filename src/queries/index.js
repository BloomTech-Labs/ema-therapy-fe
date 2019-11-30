import { gql } from 'apollo-boost';

export const getMoodsQuery = gql`
  query($sub: ID) {
    user(sub: $sub) {
      moods {
        mood
        activities
        text
        anxietyLevel
        sleep
      }
    }
  }
`;

export const addMoodMutation = gql`
  mutation(
    $userId: ID!
    $mood: Int!
    $activities: String
    $text: String
    $anxietyLevel: Int
    $sleep: Float
    $weather: String
  ) {
    addMood(
      userId: $userId
      mood: $mood
      activities: $activities
      text: $text
      anxietyLevel: $anxietyLevel
      sleep: $sleep
      weather: $weather
    ) {
      mood
      activities
      text
      anxietyLevel
      sleep
      weather
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
        activities
        anxietyLevel
        text
        sleep
        createdAt
        id
        weather
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

export const getUserIdAndLocation = gql`
  query($sub: ID) {
    user(sub: $sub) {
      isSharingLocation
      id
    }
  }
`;
