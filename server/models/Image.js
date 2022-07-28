const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedImages` array in User.js
const imageSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  user: {
      type: String,
  },
  title: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  }
});

const Image = model('Image', imageSchema);

module.exports = Image;
