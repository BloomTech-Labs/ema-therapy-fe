import { gql } from 'apollo-boost';

export const getMoodsQuery = gql`
  query($email: String) {
    user(email: $email) {
      moods {
        activities
        mood
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
    $text: String
    $anxietyLevel: Int
    $sleep: Float
    $activities: [String]
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
      text
      activities
      anxietyLevel
      sleep
      weather
    }
  }
`;

export const checkForUserAndGetMoodsQuery = gql`
  query($email: String, $firstName: String, $lastName: String) {
    user(email: $email, firstName: $firstName, lastName: $lastName) {
      email
      firstName
      lastName
      id
      moods {
        mood
        anxietyLevel
        activities
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
  mutation($email: String!, $firstName: String, $lastName: String) {
    addUser(email: $email, firstName: $firstName, lastName: $lastName) {
      email
      firstName
      lastName
      createdAt
      id
    }
  }
`;

export const getUserIdAndLocation = gql`
  query($email: String) {
    user(email: $email) {
      isSharingLocation
      id
    }
  }
`;
