const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedImages: [Image]
  }

  type Image {
    _id: ID
    image: String
    title: String
    location: [Float]
    dateTaken: String
    user: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    images: [Image]
    image(_id: ID!): Image
    imageArea(latitude: Float!, longitude: Float!, radius: Float!): [Image]
    user(_id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!): User
    deleteUser(image: String!, l: String!, password: String!): Image
    addImage(image: String!, ): Image
    updateImage(image: String!, l: String!, password: String!): Image
    deleteImage(image: String!, l: String!, password: String!): Image

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
