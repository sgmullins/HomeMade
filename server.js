require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./bin/db');
const jwt = require('jsonwebtoken');

//DB Models
const Meal = require('./models/Meals');
const User = require('./models/User');

// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const schemas = require('./schemas/schemaIndex');
const resolvers = require('./resolvers/resolversIndex.js');

const app = express();
// app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
//body parsing middleware
app.use(express.json());

app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    return {
      currentUser: req.currentUser,
      models: {
        Meal,
        User,
      },
    };
  },
});
server.applyMiddleware({ app, path: '/graphql' });

const port = process.env.PORT || 4444;

app.listen(port, () => {
  connectDB();
  console.log(`Listening on http://localhost:${port}🚀`);
});
