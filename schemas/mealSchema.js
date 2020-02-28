const { gql } = require('apollo-server-express');

const mealSchema = gql`
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
    imageURL: String!
  }

  extend type Query {
    getAllMeals: [Meal]

    searchMeals(searchTerm: String): [Meal]

    getMeal(_id: ID!): Meal

    getUserMeals(username: String!): [Meal]
  }

  extend type Mutation {
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
      imageURL: String!
    ): Meal

    deleteUserMeal(_id: ID!): Meal

    likeMeal(_id: ID!, username: String!): Meal

    unlikeMeal(_id: ID!, username: String!): Meal
  }
`;

module.exports = mealSchema;
