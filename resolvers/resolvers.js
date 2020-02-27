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
      const allMeals = await Meal.find().sort({
        madeDate: 'desc',
      });
      return allMeals;
    },

    getMeal: (parent, { _id }, { models: { Meal } }) => {
      const meal = Meal.findOne({ _id });
      return meal;
    },

    searchMeals: async (parent, { searchTerm }, { models: { Meal } }) => {
      if (searchTerm) {
        const searchResults = await Meal.find(
          {
            $text: { $search: searchTerm },
          },
          {
            score: { $meta: 'textScore' },
          },
        ).sort({
          score: { $meta: 'textScore' },
        });
        return searchResults;
      } else {
        const meals = await Meal.find().sort({
          likes: 'desc',
          madeDate: 'desc',
        });
        return meals;
      }
    },
    getUserMeals: async (parent, { username }, { models: { Meal } }) => {
      const userMeals = await Meal.find({ username }).sort({
        madeDate: 'desc',
      });
      return userMeals;
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
        // madeDate,
        allergens,
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
        allergens,
        // madeDate,
        username,
        location,
        images,
      });
      return newMeal;
    },
    deleteUserMeal: async (parent, { _id }, { models: { Meal } }) => {
      const meal = await Meal.findOneAndRemove({ _id });
      return meal;
    },
    likeMeal: async (parent, { _id, username }, { models: { Meal, User } }) => {
      const meal = await Meal.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } },
      );
      return meal;
    },
    unlikeMeal: async (
      parent,
      { _id, username },
      { models: { Meal, User } },
    ) => {
      const meal = await Meal.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } },
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } },
      );
      return meal;
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
      return { token: createToken(user, process.env.SECRET, '23hr') };
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
