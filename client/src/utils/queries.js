import { gql } from '@apollo/client';

export const QUERY_IMAGE = gql`
  query getImages($id: ID!) {
  image(_id: $id) {
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

export const QUERY_IMAGES = gql`
  query getImages{
  images {
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

export const QUERY_IMAGEAREA = gql`
  query getImages($latitude: Float!, $longitude: Float!, $radius: Float!) {
  imageArea(latitude: $latitude, longitude: $longitude, radius: $radius) {
    location
    title
    user {
      username
    }
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
    savedImages {
      _id
      image
      title
      location
      dateTaken
    }
  }
}
`;
