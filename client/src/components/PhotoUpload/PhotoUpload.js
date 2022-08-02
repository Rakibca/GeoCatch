/* Photo Upload is a modal, form, or rendered component that asks the user: title, image, and location
The photo upload updates the image database and the map database with a new marker
Photo upload should be able to be found on map and active GeoCatches after upload and sync */

import React, {useState, useEffect} from 'react';
// import { useStudentContext } from '../utils/StudentContext';
import EXIF from 'exif-js';
import '../../index.css';
import {ADD_POST} from '../../utils/mutations';
import {useMutation} from '@apollo/client';


export default function PhotoUpload() {

  const [newTitle, setNewTitle] = useState('');
  const [newLatitude, setNewLatitude] = useState(0);
  const [newLongitude, setNewLongitude] = useState(0);
  const [newImage, setNewImage] = useState(null);

  const [addPost, {
      error
    }
  ] = useMutation(ADD_POST);


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


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(newLatitude)
    console.log(newLongitude)
    let location = [newLatitude, newLongitude];



    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
    try {
      const {data} = addPost({
        variables: {
          newImage,
          location,
          newTitle
        }
      });


      console.log(newImage);
      console.log(location);
      console.log(newTitle);
      //window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

 
  return (<div>
    <form onSubmit={handleFormSubmit}>
      <h4>Upload a photo:</h4>

      <input
      type="file"
      id="file"
      accept="image/*"
      capture="environment"
      onChange={handleChange}
    />
    <br/>
    {newImage && (
    <div>
        <img alt="not found" width={"500px"} src={URL.createObjectURL(newImage)} />
        <br />
   
        </div>
             )}

      <div className="photo-upload">
        <label>Title:</label>
        <input onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" type="text" value={newTitle}/>
        <label>Latitude:</label>
        <input onChange={(e) => setNewLatitude(e.target.value)} placeholder="Enter latitude" type="number" value={newLatitude}/>
        <label>Longitude:</label>
        <input onChange={(e) => setNewLongitude(e.target.value)} placeholder="Enter longitude" type="number" value={newLongitude}/>

        <button type="submit">
          Add Geocatch
        </button>
      </div>
    </form>
  </div>);
}
