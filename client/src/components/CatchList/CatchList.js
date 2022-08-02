import React from 'react';

import {Link} from "react-router-dom";

const CatchList = ({ catches = [] }) => {
  console.log(catches);
  if (!catches.length) {
    return <h3>None yet...</h3>;
  }

  return (
    <div>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Catches
      </h3>
      {/* <div className="flex-row my-4">
        {catches && catches.map((catch) => (

            <div key={catch._id} className="col-12 mb-3 pb-3">

              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {catch.user} found you!
                  <span style={{ fontSize: '0.825rem' }}>
                    on {catch.dateTaken}
                  </span>
                </h5>
                <Link to={`/geocatches/${catch.parent._id}`}>View geocatch.</Link>
                <p className="card-body">{catch.title}</p>
              </div>
              </div>
          ))}
      </div> */}
      </div>
  );
};

export default CatchList;
