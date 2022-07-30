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

export const ADD_IMAGE = gql`
  mutation addImage($image: String!, $location: [Float]!, $title: String) {
    addImage(image: $image, location: $location, title: $title) {
      _id
    image
    title
    location
    dateTaken
    user {
      _id
      username
    }
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation updateImage($_id:ID!, $image: String, $location: [Float], $title: String) {
    updateImage(_id: $_id, image: $image, location: $location, title: $title) {
      _id
    image
    title
    location
    dateTaken
    user {
      _id
      username
    }
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation deleteImage($_id:ID!) {
    deleteImage(_id: $_id) {
      _id

    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
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
  mutation addUser(
    $_id: ID!
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
