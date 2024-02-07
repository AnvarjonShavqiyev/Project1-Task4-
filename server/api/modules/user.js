const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  lstLogTime: { type: String },
  regTime: { type: String },
  status: { type: String },
});

module.exports = mongoose.model("User", userSchema);
