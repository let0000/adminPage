const mongoose = require("mongoose");

const counselorSchema = mongoose.Schema({
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
  career: {
    type: String,
  },
});

const Counselor = mongoose.model("Counselor", counselorSchema);

module.exports = { Counselor };
