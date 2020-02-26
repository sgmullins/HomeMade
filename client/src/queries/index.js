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
      username
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
  mutation($title: String!, $category: String!, $description: String!, $ingredients: String!, $instructions: String!, $allergens: String, $amount: String!, $price: String!, $username: String, $location: String!) {
    addMeal(title: $title, category: $category, description: $description, ingredients: $ingredients, instructions: $instructions, amount: $amount, price: $price, allergens: $allergens, username: $username,location: $location) {
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
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, password: $password, email: $email) {
      token
    }
  }
`;
