const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server-express');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

const userResolvers = {
  Query: {
    getCurrentUser: async (_, args, { currentUser, models: { User } }) => {
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
    loginUser: async (_, { username, password }, { models: { User } }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError('Invalid credentials');
      }
      const matchPasswords = bcrypt.compareSync(password, user.password);
      if (!matchPasswords) {
        throw new UserInputError('Invalid credentials');
      }
      return { token: createToken(user, process.env.SECRET, '7d') };
    },
    createUser: async (
      _,
      { username, email, password, passwordConfirmation },
      { models: { User } },
    ) => {
      if (password !== passwordConfirmation) {
        throw new UserInputError('Passwords do not match');
      }
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
