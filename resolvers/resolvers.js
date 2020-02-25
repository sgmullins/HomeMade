const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server-express');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllMeals: async (parent, args, { models: { Meal } }) => {
      const allMeals = await Meal.find();
      return allMeals;
    },

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
    addMeal: async (
      parent,
      {
        title,
        category,
        description,
        ingredients,
        instructions,
        amount,
        price,
        madeDate,
        username,
        location,
        images,
      },
      { models: { Meal } },
    ) => {
      const newMeal = await Meal.create({
        title,
        category,
        description,
        ingredients,
        instructions,
        amount,
        price,
        madeDate,
        username,
        location,
        images,
      });
      return newMeal;
    },
    loginUser: async (parent, { username, password }, { models: { User } }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      const matchPasswords = bcrypt.compareSync(password, user.password);
      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }
      return { token: createToken(user, process.env.SECRET, '1hr') };
    },
    createUser: async (
      parent,
      { username, email, password },
      { models: { User } },
    ) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User Already Exists');
      }
      const newUser = await User.create({ username, password, email });
      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },
  },
};
