// May not be necessary to search for GeoCatches as the user will need to be in the area to capture GeoCatches
import React, {useState, useEffect} from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns
} from 'react-bootstrap';

import Auth from '../../utils/auth';
import {saveImage, searchGoogleImages} from '../../utils/API';
import {saveImageIds, getSavedImageIds} from '../../utils/localStorage';

const SearchImages = () => {
  // create state for holding returned google api data
  const [searchedImages, setSearchedImages] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved imageId values
  const [savedImageIds, setSavedImageIds] = useState(getSavedImageIds());

  // set up useEffect hook to save `savedImageIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return() => saveImageIds(savedImageIds);
  });

  // create method to search for images and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleImages(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const {items} = await response.json();

      const imageData = items.map((image) => ({
        imageId: image.id,
        authors: image.volumeInfo.authors || ['No author to display'],
        title: image.volumeInfo.title,
        description: image.volumeInfo.description,
        image: image.volumeInfo.imageLinks
          ?.thumbnail || ''
      }));

      setSearchedImages(imageData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a image to our database
  const handleSaveImage = async (imageId) => {
    // find the image in `searchedImages` state by the matching id
    const imageToSave = searchedImages.find((image) => image.imageId === imageId);

    // get token
    const token = Auth.loggedIn()
      ? Auth.getToken()
      : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveImage(imageToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if image successfully saves to user's account, save image id to state
      setSavedImageIds([
        ...savedImageIds,
        imageToSave.imageId
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (<> < Jumbotron fluid className = 'text-light bg-dark' > <Container>
    <h1>Search for Images!</h1>
    <Form onSubmit={handleFormSubmit}>
      <Form.Row>
        <Col xs={12} md={8}>
          <Form.Control name='searchInput' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type='text' size='lg' placeholder='Search for a image'/>
        </Col>
        <Col xs={12} md={4}>
          <Button type='submit' variant='success' size='lg'>
            Submit Search
          </Button>
        </Col>
      </Form.Row>
    </Form>
  </Container>
</Jumbotron>

<Container>
  <h2>
    {
      searchedImages.length
        ? `Viewing ${searchedImages.length} results:`
        : 'Search for a image to begin'
    }
  </h2>
  <CardColumns>
    {
      searchedImages.map((image) => {
        return (<Card key={image.imageId} border='dark'>
          {
            image.image
              ? (<Card.Img src={image.image} alt={`The cover for ${image.title}`} variant='top'/>)
              : null
          }
          <Card.Body>
            <Card.Title>{image.title}</Card.Title>
            <p className='small'>Authors: {image.authors}</p>
            <Card.Text>{image.description}</Card.Text>
            {
              Auth.loggedIn() && (<Button disabled={savedImageIds
                  ?.some((savedImageId) => savedImageId === image.imageId)} className='btn-block btn-info' onClick={() => handleSaveImage(image.imageId)}>
                {
                  savedImageIds
                    ?.some((savedImageId) => savedImageId === image.imageId)
                      ? 'This image has already been saved!'
                      : 'Save this Image!'
                }
              </Button>)
            }
          </Card.Body>
        </Card>);
      })
    }
  </CardColumns>
</Container>
</>);
};

export default SearchImages;
