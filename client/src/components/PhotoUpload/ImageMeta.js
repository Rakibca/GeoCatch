import React from "react";
import EXIF from "exif-js";

class ImageMeta extends React.Component {
  constructor(props){
    super(props)
    this.state ={ data:{}}
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
  });
  }
   handleChange = async ({
    
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

    this.setState({data: exifData})


  

    }
  }
  

render () {
  const {data} = this.state
  console.log(data)

  // if (data) {
  //   parseData(data);
  // }

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
  }



   return (
     <>
    <input
      type="file"
      id="file"
      accept="image/*"
      capture="environment"
      onChange={this.handleChange}
    />
    <br/>
    <pre style={{width:'100%'}}>{
      JSON.stringify(data, null, 2)
      }</pre>

    </>
  );
  } 

}

export default ImageMeta;
