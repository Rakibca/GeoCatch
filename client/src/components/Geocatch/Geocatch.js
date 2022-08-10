/* 
User profile includes:
    - saved/liked image card array of GeoCatches
    - completed/posted image card array of Geocatches
    - Subscription button, opens modal to pay through Stripe
*/

import React, { useRef, useState } from 'react';
// import { useStudentContext } from '../utils/StudentContext';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import '../../index.css';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

import {DELETE_POST} from '../../utils/mutations';
import Auth from '../../utils/auth';

import CatchList from '../../components/CatchList/CatchList';

import { QUERY_POST, QUERY_POSTS } from '../../utils/queries';

export default function Geocatch() {

const { _id } = useParams();

const [deletePost, {  error}] = useMutation(DELETE_POST);
const [show, setShow] = useState(false);

const { loading, data } = useQuery(QUERY_POST, {
  // Pass the `postId` URL parameter into query to retrieve this data
  variables: {_id: _id },
});
console.log(data)

const post = data?.post || {};

if (loading) {
  return <div>Loading...</div>;
}

function removePost() {
  let deleted = window.confirm("Are you sure you would like to delete this post?");
    if (deleted ===true) {
      try {
        const {data} = deletePost({
          variables: {
            _id: _id
          }
        });
      
        window.location.href = "/"
      } catch (err) {
        console.error(err);
      }
    }
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
      <a href={post.image}>
        <img className="imagedisplay" alt="not found" width={"60%"} src={post.image} /></a>
        <br />
           </div>

           {Auth.loggedIn() ? (        <Button

          onClick={(removePost)}
          variant='danger'>
          Delete Geocatch
        </Button>):("")}

    <div className="my-5">
      <CatchList catches={post.catches} />
    </div>
    <Link to={`/geocatches/${_id}/catchform`}>
    <p className="bg-success text-light"> Upload a new catch!</p>
                </Link>


  </div>
);
};