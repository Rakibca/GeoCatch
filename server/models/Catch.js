const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const catchSchema = new Schema({
  image: {
    type: String
  },
  title: {
    type: String,
    required: true,
    default: ""
  },
  location: [{
    type: Number,
    required: true,
  }],
  dateTaken: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

});

const Catch = model('Catch', catchSchema);

module.exports = Catch;
