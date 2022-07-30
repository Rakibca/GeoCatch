const { AuthenticationError } = require('apollo-server-express');
const { User, Image } = require('../models');
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    imageArea: async (parent, { location, radius }) => {

      return await Image.find( {location: { $geoWithin: { $center: [ [location], radius/1000]}}});
    },
    images: async () => {
      return await Image.find({}).populate('users');
    },
    image: async (parent, { _id }) => {
      return await Image.findById(_id);
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('images');

        user.images.sort((a, b) => b.dateTaken - a.dateTaken);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   const order = new Order({ products: args.products });
    //   const line_items = [];

    //   const { products } = await order.populate('products');

    //   for (let i = 0; i < products.length; i++) {
    //     const product = await stripe.products.create({
    //       name: products[i].name,
    //       description: products[i].description,
    //       images: [`${url}/images/${products[i].image}`]
    //     });

    //     const price = await stripe.prices.create({
    //       product: product.id,
    //       unit_amount: products[i].price * 100,
    //       currency: 'usd',
    //     });

    //     line_items.push({
    //       price: price.id,
    //       quantity: 1
    //     });
    //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`
    //   });

    //   return { session: session.id };
    // }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addImage: async (parent, { imageURL, location, title }, context) => {

      if (context.user) {
        const image = await Image.Create({imageURL, location, title});
        await User.findByIdAndUpdate(context.user._id, { $push: { images: image } });

        return image;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateImage: async (parent, args, context) => {
 
      if (context.user) {
  
        const image = await Image.findByIdAndUpdate(args);
        await User.findByIdAndUpdate(context.user._id, { $push: { images: image } });

        return image;
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndDelete(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteImage: async (parent, args, context) => {
      if (context.user) {
        const image = await Image.findByIdAndDelete(args, { new: true });
        return await User.findByIdAndUpdate(context.user._id, { $pull: { images: args } });

      }

      throw new AuthenticationError('Not logged in');
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
