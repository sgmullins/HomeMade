const userSchema = require('./userSchema');
const mealSchema = require('./mealSchema');
const { gql } = require('apollo-server-express');

//linkSchema doc https://www.apollographql.com/docs/apollo-server/features/schema-stitching/
//allows us to 'stitch' together multiple api calls using the query name
//may be outdated now, this is a bit of a hack...

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, mealSchema];
