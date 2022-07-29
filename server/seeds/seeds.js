const db = require('../config/connection');
const { Image } = require('../models');
const { User } = require('../models');

const imageData = require('./imageData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await Image.deleteMany({});

  const images = await Image.insertMany(imageData);

  console.log('Images seeded!');

  // await User.deleteMany({});

  // const users = await User.insertMany(userData);

  // console.log('Users seeded!');
  process.exit(0);
});