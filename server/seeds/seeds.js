const db = require('../config/connection');
const { Image } = require('../models');

const imageData = require('./imageData.json');

db.once('open', async () => {
  await Image.deleteMany({});

  const images = await Image.insertMany(imageData);

  console.log('Images seeded!');
  process.exit(0);
});