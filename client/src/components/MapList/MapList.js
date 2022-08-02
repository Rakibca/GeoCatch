import React from 'react';

import { Link } from "react-router-dom";

const MapList = ({ props }) => {

  let { images } = props

  return (
    <div>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Geocatches in the area
      </h3>
      <div className="flex-row my-4">
        {images && images.map((image) => (

            <div key={image._id} className="col-12 mb-3 pb-3">

              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
Can you find {image.user}?
                  <span style={{ fontSize: '0.825rem' }}>
                    Taken on {image.dateTaken}
                  </span>
                </h5>
                <Link to={`/geocatches/${image._id}`}>View geocatch.</Link>
                <p className="card-body">{image.title}</p>
              </div>
              </div>
          ))}
      </div>
      </div>

  );
};

export default MapList;
