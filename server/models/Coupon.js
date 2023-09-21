const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    unique: 1,
  },
  description: {
    type: String,
    trim: true,
  },
  discountType: {
    type: String,
  },
  discountAmount: {
    type: String,
  },
  availability: {
    type: String,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = { Coupon };
