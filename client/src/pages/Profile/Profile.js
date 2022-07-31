/* 
User profile includes:
    - saved/liked image card array of GeoCatches
    - completed/posted image card array of Geocatches
    - Subscription button, opens modal to pay through Stripe
*/

import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CatchList from '../../components/CatchList/CatchList';

import { QUERY_USER } from '../../utils/queries';
import { useRadio } from "@chakra-ui/react";

const Profile = () => {

    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { userId } = useParams();

    const { loading, data } = useQuery(QUERY_USER, {
      // pass URL parameter
      variables: { userId: userId },
    });
  
    const user = data?.profile || {};
  
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h2 className="card-header">
          {user.username}'s posts and catches:
        </h2>

    <div className="container">

<p>This will be the user's profile.</p>


<div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>

{user.posts?.length > 0 && <CatchList post={user.posts} />}
{user.catches?.length > 0 && <CatchList catch={user.catches} />}
</div>
    </div>
    </div>
  );
};

export default Profile;