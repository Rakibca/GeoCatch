/* Photo Upload is a modal, form, or rendered component that asks the user: title, image, and location
The photo upload updates the image database and the map database with a new marker
Photo upload should be able to be found on map and active GeoCatches after upload and sync */

import React, {useState, useEffect} from 'react';
import EXIF from 'exif-js';
import '../../index.css';
import './photoupload.css';
import {ADD_POST} from '../../utils/mutations';
import {QUERY_POSTS} from '../../utils/queries';
import {useMutation, useQuery} from '@apollo/client';

export default function PhotoUpload() {

  const [newTitle, setNewTitle] = useState('');
  const [newLatitude, setNewLatitude] = useState(0);
  const [newLongitude, setNewLongitude] = useState(0);
  const [newImage, setNewImage] = useState(null);

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
    imageURL = "tester"

    // let formData = new FormData();
    // formData.append('image', newImage);
    // formData.append('album', 'IGz16LwsI5wKtZ7');
    // await fetch('https://api.imgur.com/3/image', {
    //   method: 'POST',
    //   headers: new Headers({ Authorization: 'Client-ID d8752bc55bea5ea'}),
      
    //   body: formData
    //   }).then(response => {
    //   if (response.ok) {
    //     alert('Image uploaded'); console.log(response.JSON)
    //     return imageURL = response.JSON;      
    //   }
    //   }).catch(error => {
    //   console.error(JSON.stringify(error));
    //   alert('Upload failed: ' + error);
    //   });
       
    
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
    <div className="imagedisplay">
        <img className="imagedisplay" alt="not found" width={"500px"} src={URL.createObjectURL(newImage)} />
        <br />
   
        </div>
             )}

      <div className="photo-upload">
        <label className="catchlabel">Title:</label>
        <input className="inputbox" onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" type="text" value={newTitle}/>
        <label className="catchlabel">Latitude:</label>
        <input className="inputbox" onChange={(e) => setNewLatitude(e.target.value)} placeholder="Enter latitude" type="number" value={newLatitude}/>
        <label className="catchlabel">Longitude:</label>
        <input className="inputbox" onChange={(e) => setNewLongitude(e.target.value)} placeholder="Enter longitude" type="number" value={newLongitude}/>

        <button className="boxbutton" type="submit">
  
          Add Geocatch
        </button>
       
      </div>
    </form>
    {/* <button onClick={query}>Click this</button> */}
  </div>);
}
