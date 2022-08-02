/* 
User profile includes:
    - saved/liked image card array of GeoCatches
    - completed/posted image card array of Geocatches
    - Subscription button, opens modal to pay through Stripe
*/

import React, { useRef, useState } from 'react';
// import { useStudentContext } from '../utils/StudentContext';

import '../../index.css';
import { UPDATE_IMAGE, DELETE_IMAGE, ADD_IMAGE } from '../../utils/mutations';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import CatchList from '../../components/CatchList/CatchList';
import CatchForm from '../../components/CatchForm/CatchForm';

import { QUERY_POST, QUERY_POSTS } from '../../utils/queries';

export default function Geocatch() {

const { postId } = useParams();

// const { loading2, data2 } = useQuery(QUERY_POSTS);
// console.log(data2);

const { loading, data2 } = useQuery(QUERY_POST, {
  // Pass the `postId` URL parameter into query to retrieve this data
  variables: {_id: postId },
});
console.log(data2)

const post = data2?.post || {};

if (loading) {
  return <div>Loading...</div>;
}
return (
  <div className="my-3">
    <h3 className="card-header bg-dark text-light p-2 m-0">
      <span style={{ fontSize: '1rem' }}>
        {post.dateTaken}
      </span>
    </h3>
    <h3 className="card-header bg-dark text-light p-2 m-0">
      <span style={{ fontSize: '1rem' }}>
        {post.title}
      </span>
    </h3>
    <div className="imagedisplay">
        <img className="imagedisplay" alt="not found" width={"500px"} src={post.image} />
        <br />
   
        </div>


    {/* <div className="my-5">
      <CatchList catches={post.catches} />
    </div>
    <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
      <CatchForm parent={post._id} />
    </div> */}
  </div>
);
};