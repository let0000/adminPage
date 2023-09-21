const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    unique: 1,
  },
  description: {
    type: String,
    trim: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
