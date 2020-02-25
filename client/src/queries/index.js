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

export const GET_ONE_MEAL = gql`
  query($_id: ID!) {
    getMeal(_id: $_id) {
      _id
      title
      category
      description
      allergens
      ingredients
      likes
      instructions
      amount
      price
      madeDate
      location
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
