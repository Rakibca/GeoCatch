import React from 'react';
import {useQuery} from '@apollo/client';
import {QUERY_POSTS} from '../../utils/queries';

import { Link } from "react-router-dom";

const MapList = () => {

  const {loading, data} = useQuery(QUERY_POSTS);
  let posts = data
    ?.posts || [];

  console.log(posts);

  return (
    <div>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Geocatches in the area
      </h3>
      <div className="flex-row my-4">
        {posts && posts.map((post) => (

            <div key={post._id} className="col-12 mb-3 pb-3">

              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
Can you find this spot?
                  <span style={{ fontSize: '0.825rem' }}>
                    Taken on {post.dateTaken}
                  </span>
                </h5>
                <div className="imagedisplay card-body bg-secondary">
      <a href={post.image}>
        <img className="imagedisplay" alt="not found" width={"20%"} src={post.image} /></a>
        <br />
           </div>
                <Link to={`/geocatches/${post._id}`}>View geocatch.</Link>
                <p className="card-body">{post.title}</p>
              </div>
              </div>
          ))}
      </div>
      </div>

  );
};

export default MapList;
