/*
FEATURES:
- MAP
- PLACE MARKER/GEOCATCH (LAT/LON)
- FORM FILLOUT: GEOCATCH
    - Title of post
    - Image source/upload
    - Latitude
    - Longitude
    - Date created
- GEOCATCHES LIST (BELOW MAP)
    - DUMMY DATABASE OF USER GEOCATCHES
*/

import React from 'react';
// import { useQuery } from '@apollo/client';
import MapBox from '../../components/MapBox/MapBox';

const Home = () => {
    return (
        <div>
        <MapBox />
        </div>
    )
}

export default Home;