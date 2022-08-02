const db = require('../config/connection');
const { Post } = require('../models');
const { User } = require('../models');

const postData = require('./postData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await Post.deleteMany({});

  const posts = await Post.insertMany(postData);

  console.log('Images seeded!');

  await User.deleteMany({});

  const users = await User.insertMany(userData);

  console.log('Users seeded!');
  process.exit(0);
});