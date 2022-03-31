const Joi = require("joi-browser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 15,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  location: {
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
  },
  symptoms: Array,
  temperature: Number,
  age: Number,
  gender: String,
});

const User = mongoose.model("User", userSchema);
// function validateUser(user) {
//   const schema = {
//     name: Joi.string().min(2).max(50).required(),
//     email: Joi.string().min(5).max(255).required().email(),
//   };
//   return Joi.validate(user, schema);
// }
module.exports = User;
