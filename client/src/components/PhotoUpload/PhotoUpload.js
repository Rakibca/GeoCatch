/* Photo Upload is a modal, form, or rendered component that asks the user: title, image, and location
The photo upload updates the image database and the map database with a new marker
Photo upload should be able to be found on map and active GeoCatches after upload and sync */

import React, {useRef, useState} from 'react';
// import { useStudentContext } from '../utils/StudentContext';
import EXIF from 'exif-js';
import '../index.css';
import {ADD_IMAGE} from '../../utils/mutations';
import {useMutation} from '@apollo/client';

export default function PhotoUpload() {

  const [addImage, {
      error
    }
  ] = useMutation(ADD_IMAGE);

  function getExif(img1) {

    EXIF.getData(img1, function() {
      let allData = EXIF.getAllTags(this);

      let latdegrees = (allData.GPSLatitude[0].numerator) / (allData.GPSLatitude[0].denominator);
      let latminutes = (allData.GPSLatitude[1].numerator) / (allData.GPSLatitude[1].denominator);
      let latseconds = (allData.GPSLatitude[2].numerator) / (allData.GPSLatitude[2].denominator);

      let latitude = latdegrees + (latminutes / 60) + (latseconds / 3600);

      if (EXIF.getTag(this, "GPSLatitudeRef") === "S") {
        latitude = -latitude
      }

      let longdegrees = (allData.GPSLongitude[0].numerator) / (allData.GPSLongitude[0].denominator);
      let longminutes = (allData.GPSLongitude[1].numerator) / (allData.GPSLongitude[1].denominator);
      let longseconds = (allData.GPSLongitude[2].numerator) / (allData.GPSLongitude[2].denominator);

      let longitude = longdegrees + (longminutes / 60) + (longseconds / 3600);

      if (EXIF.getTag(this, "GPSLongitudeRef") === "W") {
        longitude = -longitude
      }
      console.log(latitude + ", " + longitude)

      return [latitude, longitude];

    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
    try {
      const {data} = addImage({
        variables: {
          newImage,
          newLocation,
          newTitle
        }
      });

      window.location.reload();
      console.log("Image added successfully!")
    } catch (err) {
      console.error(err);
    }
  };

  // const { students, addStudent, removeStudent, majors } = useStudentContext();

  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState([]);
  const [newImage, setNewImage] = useState("");
  const ref = useRef(null);
  const ref2 = useRef(null);

  const imgInput = ref.current;
  let uploadedImage = "";
  const display = ref2.current;

  imgInput.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploadedImage = reader.result;
      display.style.backgroundImage = `url(${uploadedImage})`;
    });
    reader.readAsDataURL(this.files[0]);
    setNewImage(uploadedImage);
    let location = getExif(uploadedImage);

    setNewLocation(location[0], location[1]);

  });

  return (<div>
    <form onSubmit={handleFormSubmit}>
      <h4>Upload a photo:</h4>
      <input ref={ref} type="file" id="image_input" accept="image/png, image/jpg, image/jpeg"></input>

      <div ref={ref2} id="display"></div>

      <div className="photo-upload">
        <input onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" type="text" value={newTitle}/>

        <input onChange={(e) => setNewLocation[0](e.target.value)} placeholder="Enter latitude" type="number" value={newLocation[0]}/>

        <input onChange={(e) => setNewLocation[1](e.target.value)} placeholder="Enter longitude" type="number" value={newLocation[1]}/>

        <button type="submit">
          Add Geocatch
        </button>
      </div>
    </form>
  </div>);
}
