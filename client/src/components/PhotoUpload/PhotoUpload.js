/* Photo Upload is a modal, form, or rendered component that asks the user: title, image, and location
The photo upload updates the image database and the map database with a new marker
Photo upload should be able to be found on map and active GeoCatches after upload and sync */

import React, {useState} from 'react';
import EXIF from 'exif-js';
import '../../index.css';
import './photoupload.css';
import {ADD_POST} from '../../utils/mutations';
import {QUERY_POSTS, QUERY_POST} from '../../utils/queries';
import {useMutation, useQuery} from '@apollo/client';
import { Image } from 'cloudinary-react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import Axios from 'axios'
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PhotoUpload() {

const [newTitle, setNewTitle] = useState('');
const [newLatitude, setNewLatitude] = useState(0);
const [newLongitude, setNewLongitude] = useState(0);
const [newImage, setNewImage] = useState(null);
const [validated] = useState(false);
const [showAlert, setShowAlert] = useState(false);

const [addPost, {
  error
}
] = useMutation(ADD_POST);


console.log("query")

const { loading, data } = useQuery(QUERY_POSTS);
console.log(data)

function parseData(data) {
let latdegrees = (data.GPSLatitude[0].numerator) / (data.GPSLatitude[0].denominator);
let latminutes = (data.GPSLatitude[1].numerator) / (data.GPSLatitude[1].denominator);
let latseconds = (data.GPSLatitude[2].numerator) / (data.GPSLatitude[2].denominator);

let latitude = latdegrees + (latminutes / 60) + (latseconds / 3600);

if (data.GPSLatitudeRef === "S") {
latitude = -latitude
}

let longdegrees = (data.GPSLongitude[0].numerator) / (data.GPSLongitude[0].denominator);
let longminutes = (data.GPSLongitude[1].numerator) / (data.GPSLongitude[1].denominator);
let longseconds = (data.GPSLongitude[2].numerator) / (data.GPSLongitude[2].denominator);

let longitude = longdegrees + (longminutes / 60) + (longseconds / 3600);

if (data.GPSLongitudeRef === "W") {
longitude = -longitude
}

console.log(latitude + ", " + longitude)

return [latitude, longitude]
}


const handleChange = async ({

target: {
files: [file]
}
}) => {
if (file && file.name) {
const exifData = await new Promise(resolve =>{
EXIF.getData(file, function(){
  resolve(EXIF.getAllTags(this))
})
})

let data = (exifData)

console.log(data);
let location = parseData(data);
console.log(location)
console.log(file)

setNewLongitude(location[1]);
setNewLatitude(location[0])

setNewImage(file);

}
}

let imageURL;



const handleFormSubmit = async (event) => {
event.preventDefault();
console.log(newLatitude)
console.log(newLongitude)
let location = [newLatitude, newLongitude];

let formData = new FormData();
formData.append('file', newImage);
formData.append("upload_preset", "syzduuoq")
await Axios.post("https://api.cloudinary.com/v1_1/dahwzxpwp/image/upload", formData)
.then ((res) => {
    console.log(res.data.secure_url)
    imageURL = res.data.secure_url; 
})


try {
  const {data} = addPost({
    variables: {
      image: imageURL,
      location: location,
      title: newTitle
    }
  });


  console.log(imageURL);
  console.log(location);
  console.log(newTitle);
  alert("Geocatch added successfully!");
  <Link to="/" />
} catch (err) {
  console.error(err);
}
};


return (
<div class="text-sm md:text-base lg:text-lg xl:text-xl font-bold">
  <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='file'>Upload a Photo!</Form.Label>
          <Form.Control
            type='file'
            id="file"
            accept="image/*"
            capture="environment"
            name='file'
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Photo is required!</Form.Control.Feedback>
        </Form.Group>

<br/>
{newImage && (
<div className="imagedisplay">
    <img className="imagedisplay" alt="not found" width={"500px"} src={URL.createObjectURL(newImage)} />
    <br />

    </div>
         )}

<Form.Group>
          <Form.Label htmlFor='title'>Title:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Look where I am...'
            name='title'
            onChange={(e) => setNewTitle(e.target.value)} 
            value={newTitle}
            required
          />
          <Form.Control.Feedback type='invalid'>Title is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='latitude'>Latitude (East-West):</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter latitude'
            name='latitude'
            onChange={(e) => setNewLatitude(e.target.value)}
            value={newLatitude}
            required
          />
          <Form.Control.Feedback type='invalid'>Latitude is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='longitude'>Longitude (North-South):</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter longitude'
            name='longitude'
            onChange={(e) => setNewLongitude(e.target.value)}
            value={newLongitude}
            required
          />
          <Form.Control.Feedback type='invalid'>Longitude is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(newLatitude && newTitle && newLongitude && newImage)}
          type='submit'
          variant='success'>
          Add Geocatch
        </Button>


    </Form>
   
  </div>
);
}
