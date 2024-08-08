//
//
//
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/chats"); // database created called chats

// lets create schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
