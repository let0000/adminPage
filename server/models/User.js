const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  detailAddress: {
    type: String,
  },
  birth: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
