import { gql } from '@apollo/client';

export const QUERY_POST = gql`
  query post($_id: ID!) {
  post(_id: $_id) {
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      posts
      catches
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts{
  posts {
    _id
    image
    title
    location
    dateTaken
  }
}
`;

export const QUERY_POSTAREA = gql`
  query postArea($latitude: Float!, $longitude: Float!, $radius: Float!) {
  postArea(latitude: $latitude, longitude: $longitude, radius: $radius) {
    location
    image
    title
  }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
    username
    email
    password
    posts {
      _id
      image
      title
      location
      dateTaken
    }
  }
}
`;
