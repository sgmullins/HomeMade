const mongoose = require('mongoose');
const { Schema } = mongoose;

const MealSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    allergens: {
      type: String,
    },
    ingredients: {
      type: String,
      require: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    instructions: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    madeDate: {
      type: Date,
      default: Date.now,
    },
    username: {
      //might need to convert this to a 'User ref'
      type: String,
    },
    location: {
      type: String,
      require: true,
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  { timestamps: true }, //added for later use of expiring foods???
);

MealSchema.index({
  geometry: '2dsphere',
});

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;
