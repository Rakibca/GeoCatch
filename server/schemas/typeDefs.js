const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
    catches: [Catch]
  }

  type Post {
    _id: ID
    image: String
    title: String
    location: [Float]
    dateTaken: String
    catches: [Catch]

  }

  type Catch {
    _id: ID
    image: String
    title: String
    location: [Float]
    dateTaken: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    posts: [Post]
    post(_id: ID!): Post
    postArea(latitude: Float!, longitude: Float!, radius: Float!): [Post]
    user(_id: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    deleteUser(_id: ID!): User
    addPost(image: String!, location: [Float]!, title: String ): Post
    updatePost(_id: ID!, image: String, location: [Float], title: String): Post
    deletePost(_id: ID!): Post
    addCatch(_id: ID!, image: String!, location: [Float]!, title: String ): Post

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
