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

import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

const Home = () => {
    const [markerList, setMarkerList] = useState([]);

    useEffect(() => {
        const getMarkerList = async () => {
            
        }
    })
}