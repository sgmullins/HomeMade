const { gql } = require('apollo-server-express');

const userSchema = gql`
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

  extend type Query {
    getCurrentUser: User
  }

  extend type Mutation {
    loginUser(username: String!, password: String!): Token

    createUser(username: String!, email: String!, password: String!, passwordConfirmation: String!): Token
  }
`;

module.exports = userSchema;
