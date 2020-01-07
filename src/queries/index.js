import { gql } from 'apollo-boost';

export const getMoodsQuery = gql`
  query($email: String) {
    user(email: $email) {
      moods {
        activities
        id
        mood
        text
        anxietyLevel
        sleep
        weather
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
      tasks {
        id
        completedAt
        prompt
        text
        photoUrl
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

export const removeMoodMutation = gql`
  mutation($id: String!) {
    removeMood(id: $id) {
      id
    }
  }
`;

export const editMoodMutation = gql`
  mutation(
    $id: ID!
    $mood: Int!
    $activities: [String]
    $text: String
    $anxietyLevel: Int
    $sleep: Float
  ) {
    editMood(
      id: $id
      mood: $mood
      activities: $activities
      text: $text
      anxietyLevel: $anxietyLevel
      sleep: $sleep
    ) {
      id
      createdAt
      mood
      activities
      text
      anxietyLevel
      sleep
      weather
    }
  }
`;

export const removeTaskMutation = gql`
  mutation($id: String!) {
    removeTask(id: $id) {
      id
    }
  }
`;
