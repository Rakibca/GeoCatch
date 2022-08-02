const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Catch } = require('../models');
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    postArea: async (parent, { latitude, longitude, radius }) => {

      return await Post.find( {location: { $geoWithin: { $center: [ [latitude, longitude], radius/1000]}}});
    },
    posts: async () => {
      return await Post.find({}).populate('catches');
    },
    post: async (parent, { _id }) => {
      return await Post.findById(_id).populate('catches');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('posts', 'catches');

        user.posts.sort((a, b) => b.dateTaken - a.dateTaken);
        user.catches.sort((a, b) => b.dateTaken - a.dateTaken);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
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
    addPost: async (parent, { image, location, title }, context) => {

      if (context.user) {
        const post = await Post.create({image, location, title});
        await User.findByIdAndUpdate(context.user._id, { $push: { posts: post } });

        return post;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updatePost: async (parent, args, context) => {
 
      if (context.user) {
 
        const post = await Post.findByIdAndUpdate(args);
        return post;
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndDelete(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    deletePost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.findByIdAndDelete(args, { new: true });
        return await User.findByIdAndUpdate(context.user._id, { $pull: { posts: args } });

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
