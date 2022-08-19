import React from 'react';

import {Link} from "react-router-dom";

const CatchList = ({ catches }) => {
  console.log(catches);
  if (!catches.length) {
    return <h3>No catches yet...</h3>;
  }

  return (
    <div>
      <h2
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Catches
      </h2>
       <div className="flex-row my-4">
        {catches && catches.map((catch1) => (

            <div key={catch1._id} className="col-12 mb-3 pb-3">

              <div>
                <h5 className="card-header">
                  {catch1.user} found you! 
                  <br />
                  <span style={{ fontSize: '0.825rem' }}>
                    on {catch1.dateTaken}
                  </span>
                </h5>

                <div className="imagedisplay card-body bg-secondary">
      <a href={catch1.image}>
        <img className="imagedisplay" alt="not found" width={"40%"} src={catch1.image} /></a>
        <br />
           </div>
                <p className="card-body" style={{ borderBottom: '1px solid #1a1a1a' }}>{catch1.title}</p>
              </div>
              </div>
          ))}
      </div> 
      </div>
  );
};

export default CatchList;
