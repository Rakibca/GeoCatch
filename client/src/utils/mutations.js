import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPOST($image: String!, $location: [Float]!, $title: String) {
    addPost(image: $image, location: $location, title: $title) {
      _id
    image
    title
    location
    dateTaken
    }
  }
`;

export const ADD_CATCH = gql`
  mutation addCatch($id: ID!, $image: String!, $location: [Float]!, $title: String) {
    addCatch(_id: $id, image: $image, location: $location, title: $title) {
      _id
    image
    title
    location
    dateTaken
    catches {
      _id
    image
    title
    location
    dateTaken
    }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($_id:ID!, $image: String, $location: [Float], $title: String) {
    updatePost(_id: $_id, image: $image, location: $location, title: $title) {
      _id
    image
    title
    location
    dateTaken
  }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($_id:ID!) {
    deletePost(_id: $_id) {
      _id

    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String
    $email: String
    $password: String
  ) {
    updateUser(
      userName: $username
      email: $email
      password: $password
    ) {
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser(
    $_id: ID!
  ) {
    deleteUser(_id: $_id) {
      _id

    }
  }
`;
