const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  user: {
      type: String,
      required: true,
  },
  title: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  dateTaken: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const Image = model('Image', imageSchema);

module.exports = Image;
