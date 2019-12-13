import { gql } from 'apollo-boost';

// export const getMoodsQuery = gql`
//   query($sub: ID) {
//     user(sub: $sub) {
//       moods {
//         mood
//         text
//         anxietyLevel
//         sleep
//       }
//     }
//   }
// `;

export const getMoodsQuery = gql`
  query($email: String) {
    user(email: $email) {
      moods {
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
    $weather: String
  ) {
    addMood(
      userId: $userId
      mood: $mood
      text: $text
      anxietyLevel: $anxietyLevel
      sleep: $sleep
      weather: $weather
    ) {
      mood
      text
      anxietyLevel
      sleep
      weather
    }
  }
`;

// export const checkForUserAndGetMoodsQuery = gql`
//   query($sub: ID, $email: String, $firstName: String, $lastName: String) {
//     user(sub: $sub, email: $email, firstName: $firstName, lastName: $lastName) {
//       sub
//       email
//       firstName
//       lastName
//       id
//       moods {
//         mood
//         anxietyLevel
//         text
//         sleep
//         createdAt
//         id
//         weather
//       }
//     }
//   }
// `;

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

// export const getUserIdAndLocation = gql`
//   query($sub: ID) {
//     user(sub: $sub) {
//       isSharingLocation
//       id
//     }
//   }
// `;

export const getUserIdAndLocation = gql`
  query($email: String) {
    user(email: $email) {
      isSharingLocation
      id
    }
  }
`;
