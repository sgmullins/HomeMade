import { gql } from 'apollo-boost';

// Meal queiries
export const GET_ALL_MEALS = gql`
  query {
    getAllMeals {
      _id
      title
      category
      description
      ingredients
      instructions
      amount
      price
      madeDate
      # username
      location
      #images
    }
  }
`;

/* Meal Mutations */

/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }
`;

/* User Mutations */
export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, password: $password, email: $email) {
      token
    }
  }
`;
