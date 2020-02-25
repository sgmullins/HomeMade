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
    amount: Int!
    price: Float!
    madeDate: String!
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

    getMeal(_id: ID!): Meal

    getCurrentUser: User
  }

  type Mutation {
    addMeal(
      title: String!
      category: String!
      description: String!
      ingredients: String!
      instructions: String!
      amount: Int!
      price: Float!
      madeDate: String!
      username: String
      location: String!
      images: [String]
    ): Meal

    loginUser(username: String!, password: String!): Token
    createUser(username: String!, email: String!, password: String!): Token
  }
`;

// module.exports = typeDefs;
