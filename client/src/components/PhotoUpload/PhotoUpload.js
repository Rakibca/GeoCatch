/* Photo Upload is a modal, form, or rendered component that asks the user: title, image, and location
The photo upload updates the image database and the map database with a new marker
Photo upload should be able to be found on map and active GeoCatches after upload and sync */

import React, {useState, useEffect} from 'react';
// import { useStudentContext } from '../utils/StudentContext';
import EXIF from 'exif-js';
import '../../index.css';
import {ADD_IMAGE} from '../../utils/mutations';
import {useMutation} from '@apollo/client';
import ImageMeta from './ImageMeta';

export default function PhotoUpload() {


  const [addImage, {
      error
    }
  ] = useMutation(ADD_IMAGE);



//   function waitForElm(selector) {
//     return new Promise(resolve => {
//         if (document.querySelector(selector)) {
//             return resolve(document.querySelector(selector));
//         }

//         const observer = new MutationObserver(mutations => {
//             if (document.querySelector(selector)) {
//                 resolve(document.querySelector(selector));
//                 observer.disconnect();
//             }
//         });

//         observer.observe(document.body, {
//             childList: true,
//             subtree: true
//         });
//     });
// }



// function getExif(img1) {

//     EXIF.getData(img1, function() {
//       let myData = this;

//       console.log(myData.exifdata)

//       // let latdegrees = (exifdata.GPSLatitude[0].numerator) / (exifdata.GPSLatitude[0].denominator);
//       // let latminutes = (exifdata.GPSLatitude[1].numerator) / (exifdata.GPSLatitude[1].denominator);
//       // let latseconds = (exifdata.GPSLatitude[2].numerator) / (exifdata.GPSLatitude[2].denominator);

//       // let latitude = latdegrees + (latminutes / 60) + (latseconds / 3600);

//       // if (exifdata.GPSLatitudeRef === "S") {
//       //   latitude = -latitude
//       // }

//       // let longdegrees = (exifdata.GPSLongitude[0].numerator) / (exifdata.GPSLongitude[0].denominator);
//       // let longminutes = (exifdata.GPSLongitude[1].numerator) / (exifdata.GPSLongitude[1].denominator);
//       // let longseconds = (exifdata.GPSLongitude[2].numerator) / (exifdata.GPSLongitude[2].denominator);

//       // let longitude = longdegrees + (longminutes / 60) + (longseconds / 3600);

//       // if (exifdata.GPSLongitudeRef === "W") {
//       //   longitude = -longitude
//       // }
//       // console.log(latitude + ", " + longitude)

//       // return [latitude, longitude];

//     })
//   }


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
    try {
      const {data} = addImage({
        variables: {
          newImage,
          newLatitude, newLongitude,
          newTitle
        }
      });


      console.log(newImage);
      console.log(newLatitude);
      console.log(newLongitude);
      console.log(newTitle);
      //window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // const { students, addStudent, removeStudent, majors } = useStudentContext();

  const [newTitle, setNewTitle] = useState('');
  const [newLatitude, setNewLatitude] = useState();
  const [newLongitude, setNewLongitude] = useState();
  const [newImage, setNewImage] = useState(null);
  // getExif(document.getElementById("the-img"));
  
  // useEffect(() => {
  //   getExif(document.getElementById("the-img"));
  // }, [newImage]);

  // const imgInput = document.querySelector("image_input");
  // let uploadedImage = "";
  // const display = document.querySelector("display");

  // if (imgInput) {

  // imgInput.addEventListener("change", function() {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     uploadedImage = reader.result;
  //     display.style.backgroundImage = `url(${uploadedImage})`;
  //   });
  //   reader.readAsDataURL(this.files[0]);
  //   setNewImage(uploadedImage);
  //   let location = getExif(uploadedImage);

  //   setNewLatitude(location[0])
  //   setNewLongitude(location[1]);

  // })  };

  return (<div>
    <form onSubmit={handleFormSubmit}>
      <h4>Upload a photo:</h4>

      <ImageMeta setLat={setNewLatitude} setLong={setNewLongitude}/>

      <div className="photo-upload">
        <label>Title:</label>
        <input onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" type="text" value={newTitle}/>
        <label>latitude:</label>
        <input onChange={(e) => setNewLatitude(e.target.value)} placeholder="Enter latitude" type="number" value={newLatitude}/>
        <label>longitude:</label>
        <input onChange={(e) => setNewLongitude(e.target.value)} placeholder="Enter longitude" type="number" value={newLongitude}/>

        <button type="submit">
          Add Geocatch
        </button>
      </div>
    </form>
  </div>);
}
