import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import EXIF from 'exif-js';
import '../../index.css';
import '../PhotoUpload/photoupload.css';
import {ADD_CATCH} from '../../utils/mutations';
import {QUERY_POST} from '../../utils/queries';
import {useMutation, useQuery} from '@apollo/client';
import { Image } from 'cloudinary-react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import Axios from 'axios'
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CatchForm = ({ parent }) => {

  const [newTitle, setNewTitle] = useState('');
const [newLatitude, setNewLatitude] = useState(0);
const [newLongitude, setNewLongitude] = useState(0);
const [newImage, setNewImage] = useState(null);
const [validated] = useState(false);
const [showAlert, setShowAlert] = useState(false);

  const [addCatch, {
    error
  }
] = useMutation(ADD_CATCH);

const stuff = useParams();

const { loading, data } = useQuery(QUERY_POST, {

  variables: {_id: stuff._id},
});
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

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
  
  function calcCrow(lat1, lon1, lat2, lon2) 
  {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }
  

  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      console.log(newLatitude)
      console.log(newLongitude)
      console.log(data.post.location[0])
      console.log(data.post.location[1])

      let distance = calcCrow(newLatitude, newLongitude, data.post.location[0], data.post.location[1]);
  console.log(distance)
  let points;
      if (distance > 0.1) {
        alert("Your picture is too far away!")
        return;
      } else {
        if (distance !=0) {
        points = Math.floor(100-(distance *1000))
        } else {
        points = 100
        }
  
      console.log(newLatitude)
      console.log(newLongitude)
      let location = [newLatitude, newLongitude];
  
      let formData = new FormData();
      formData.append('file', newImage);
      formData.append("upload_preset", "syzduuoq")
      await Axios.post("https://api.cloudinary.com/v1_1/dahwzxpwp/image/upload", formData)
      .then ((res) => {
          imageURL = res.data.secure_url; 
      })
      
      console.log(stuff._id);

           
      try {
        const {data2} = addCatch({
          variables: {
            id: stuff._id,
            image: imageURL,
            location: location,
            title: newTitle
          }
        });
  
        console.log(imageURL);
        console.log(location);
        console.log(newTitle);
        alert("Catch added successfully!");
        alert(`Good job! You got ${points} points!`);
        <Link to="/" />
      } catch (err) {
        console.error(err);
      }
    };
    };


    return (<div>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something went wrong with your login credentials!
            </Alert>
            <Form.Group>
              <Form.Label htmlFor='file'>Upload a photo</Form.Label>
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
              <Form.Label htmlFor='latitude'>Latitude:</Form.Label>
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
              <Form.Label htmlFor='longitude'>Longitude:</Form.Label>
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

export default CatchForm;
