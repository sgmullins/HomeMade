const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server-express');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

const userResolvers = {
  Query: {
    getCurrentUser: async (parent, args, { currentUser, models: { User } }) => {
      if (!currentUser) return null;
      const user = await User.findOne({ username: currentUser.username })
        .populate({
          path: 'favorites',
          model: 'Meal',
        })
        .populate({
          path: 'purchases',
          model: 'Meal',
        });
      return user;
    },
  },
  Mutation: {
    loginUser: async (parent, { username, password }, { models: { User } }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      const matchPasswords = bcrypt.compareSync(password, user.password);
      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }
      return { token: createToken(user, process.env.SECRET, '7d') };
    },
    createUser: async (
      parent,
      { username, email, password },
      { models: { User } },
    ) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new AuthenticationError('User Already Exists');
      }
      const newUser = await User.create({ username, password, email });
      return { token: createToken(newUser, process.env.SECRET, '7d') };
    },
  },
};

module.exports = userResolvers;
