const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  questionDate: {
    type: String,
  },
  questionUid: {
    type: String,
  },
  questionTitle: {
    type: String,
  },
  questionDiscription: {
    type: String,
    trim: true,
  },
  anwser: {
    type: String,
  },
  anwserDate: {
    type: String,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = { Question };
