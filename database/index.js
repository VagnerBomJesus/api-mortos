// to use .env file variables
require("dotenv").config();

// import mongoose library
const mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
  .then(() => console.log(' Conectados a ' + process.env.DB_NAME + ' com Sucesso!'))
  .catch(err => console.log(err))

module.exports = mongoose;