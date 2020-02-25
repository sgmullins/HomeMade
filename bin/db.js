require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose
    .connect(process.env.DATABASEURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB atlas DB is connected 🙉');
    })
    .catch(err => {
      console.log('ERROR:', err.message);
    });
};
module.exports = connectDB;
