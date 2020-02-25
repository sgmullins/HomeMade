const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Meal',
  },
  purchases: {
    type: [Schema.Types.ObjectId],
    ref: 'Meal',
  },
  allergies: [String],
});

UserSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
