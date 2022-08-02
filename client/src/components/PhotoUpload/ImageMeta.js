import React from "react";
import EXIF from "exif-js";

class ImageMeta extends React.Component {
  constructor(props){
    super(props)
    this.state ={ data:{}}
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      console.log(props)
  });
  }
 
  

render ({handleChange}) {
  const {data} = this.state

  // if (data) {
  //   parseData(data);
  // }




   return (
     <>
    <input
      type="file"
      id="file"
      accept="image/*"
      capture="environment"
      onChange={event => this.handleChange(event)}
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
