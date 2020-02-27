const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Meal {
    _id: ID
    title: String!
    category: String!
    description: String!
    allergens: String
    ingredients: String!
    likes: Int
    instructions: String!
    amount: String!
    madeDate: String
    price: String!
    username: String!
    location: String!
    geometry: String
    coordinates: [Int]
    images: String
  }

  type User {
    _id: ID
    username: String!
    email: String!
    joinDate: String
    favorites: [Meal]
    purchases: [Meal]
    allergies: [String]
  }

  type Token {
    token: String!
  }

  type Query {
    getAllMeals: [Meal]

    searchMeals(searchTerm: String): [Meal]

    getMeal(_id: ID!): Meal

    getCurrentUser: User

    getUserMeals(username: String!): [Meal]
  }

  type Mutation {
    addMeal(
      title: String!
      category: String!
      description: String!
      ingredients: String!
      instructions: String!
      amount: String!
      allergens: String
      price: String!
      username: String
      location: String!
      images: String
    ): Meal

    loginUser(username: String!, password: String!): Token

    createUser(username: String!, email: String!, password: String!): Token

    deleteUserMeal(_id: ID!): Meal

    likeMeal(_id: ID!, username: String!): Meal
  }
`;

// module.exports = typeDefs;
