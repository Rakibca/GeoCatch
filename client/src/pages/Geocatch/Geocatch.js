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

import { QUERY_IMAGE } from '../../utils/queries';

export default function Geocatch() {

const { imageId } = useParams();

const { loading, data } = useQuery(QUERY_IMAGE, {
  // Pass the `imageId` URL parameter into query to retrieve this thought's data
  variables: {imageId: imageId },
});

const image = data?.image || {};

if (loading) {
  return <div>Loading...</div>;
}
return (
  <div className="my-3">
    <h3 className="card-header bg-dark text-light p-2 m-0">
      {image.user} <br />
      <span style={{ fontSize: '1rem' }}>
        {image.dateTaken}
      </span>
    </h3>
    <div className="bg-light py-4">
      <blockquote
        className="p-4"
        style={{
          fontSize: '1.5rem',
          fontStyle: 'italic',
          border: '2px dotted #1a1a1a',
          lineHeight: '1.5',
        }}
      >
        {image.image}
      </blockquote>
    </div>

    <div className="my-5">
      <CatchList catches={image.catches} />
    </div>
    <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
      <CatchForm parent={image._id} />
    </div>
  </div>
);
};