// Use a Saved Image array to allow the user to save GeoCatches and check them in their User Profile

import React, {useState, useEffect} from 'react';
import {Jumbotron, Container, CardColumns, Card, Button} from 'react-bootstrap';

import {getMe, deleteImage} from '../../utils/API';
import Auth from '../../utils/auth';
import {removeImageId} from '../../utils/localStorage';

const SavedImages = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn()
          ? Auth.getToken()
          : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the image's mongo _id value as param and deletes the image from the database
  const handleDeleteImage = async (imageId) => {
    const token = Auth.loggedIn()
      ? Auth.getToken()
      : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteImage(imageId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove image's id from localStorage
      removeImageId(imageId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (<> < Jumbotron fluid className = 'text-light bg-dark' > <Container>
    <h1>Viewing saved images!</h1>
  </Container>
</Jumbotron>
<Container>
  <h2>
    {
      userData.savedImages.length
        ? `Viewing ${userData.savedImages.length} saved ${userData.savedImages.length === 1
          ? 'image'
          : 'images'}:`
        : 'You have no saved images!'
    }
  </h2>
  <CardColumns>
    {
      userData.savedImages.map((image) => {
        return (<Card key={image.imageId} border='dark'>
          {
            image.image
              ? <Card.Img src={image.image} alt={`The photo for ${image.title}`} variant='top'/>
              : null
          }
          <Card.Body>
            <Card.Title>{image.title}</Card.Title>
            <p className='small'>Authors: {image.authors}</p>
            <Card.Text>{image.description}</Card.Text>
            <Button className='btn-block btn-danger' onClick={() => handleDeleteImage(image.imageId)}>
              Delete this image!
            </Button>
          </Card.Body>
        </Card>);
      })
    }
  </CardColumns>
</Container>
</>);
};

export default SavedImages;
