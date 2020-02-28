const { AuthenticationError } = require('apollo-server-express');

const userResolvers = {
  Query: {
    //Is what it sounds like, returns all meals, Homepage
    getAllMeals: async (parent, args, { models: { Meal } }) => {
      const allMeals = await Meal.find().sort({
        madeDate: 'desc',
      });
      return allMeals;
    },
    //Returns single meal, no Auth
    getMeal: (parent, { _id }, { models: { Meal } }) => {
      const meal = Meal.findOne({ _id });
      return meal;
    },
    //Search function: this needs to be improved.
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
    //get the meals of the current user
    getUserMeals: async (parent, { username }, { models: { Meal } }) => {
      if (!username) {
        throw new AuthenticationError('No user is defined');
      }
      const userMeals = await Meal.find({ username }).sort({
        madeDate: 'desc',
      });
      return userMeals;
    },
  },

  Mutation: {
    //needs auth method setup here, probably could use token
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
        allergens,
        username,
        location,
        imageURL,
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
        username,
        location,
        imageURL,
      });
      return newMeal;
    },
    //deletes a meal, needs auth on backend
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
  },
};

module.exports = userResolvers;
