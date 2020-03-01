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
      # madeDate
      # username
      location
      imageURL
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
      username
      imageURL
    }
  }
`;

export const SEARCH_MEALS = gql `
query($searchTerm: String){
  searchMeals(searchTerm: $searchTerm){
    _id
    title
    likes
  }
}
`

/* Meal Mutations */
export const ADD_MEAL = gql`
  mutation($title: String!, $category: String!, $description: String!, $ingredients: String!, $imageURL: String!, $instructions: String!, $allergens: String, $amount: String!, $price: String!, $username: String, $location: String!) {
    addMeal(title: $title, category: $category, description: $description, ingredients: $ingredients, imageURL: $imageURL, instructions: $instructions, amount: $amount, price: $price, allergens: $allergens, username: $username,location: $location) {
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
      imageURL
    }
  }
`;
/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites{
        _id
        title
      }
      purchases{
        _id
        title
      }
    }
  }
`;

export const GET_USER_MEALS = gql`
query($username: String!){
  getUserMeals(username: $username){
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
      imageURL
  }
}
`
export const DELETE_USER_MEAL = gql `
mutation($_id: ID!){
  deleteUserMeal(_id: $_id){
    _id
  }
}
`

export const LIKE_MEAL = gql `
mutation($_id: ID!, $username: String!){
  likeMeal(_id: $_id, username: $username){
    _id
    likes
  }
}
`
export const UNLIKE_MEAL = gql `
mutation($_id: ID!, $username: String!){
  unlikeMeal(_id: $_id, username: $username){
    _id
    likes
  }
}
`

/* User Mutations */
export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    createUser(username: $username, password: $password, email: $email, passwordConfirmation: $passwordConfirmation) {
      token
    }
  }
`;
