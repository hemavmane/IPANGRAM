const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  PhoneNumber: {
    type: String,
  },
  userID: { type: String },
  userType: { type: String },
  address: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
