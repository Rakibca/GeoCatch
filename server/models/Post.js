const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  image: {
    type: String
  },
  user:       {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  catches: [{
    type: Schema.Types.ObjectId,
    ref: 'Catch',
  }
  ]

});

const Post = model('Post', postSchema);

module.exports = Post;
