/* Component that holds the interactive map where users can see nearby GeoCatches
Click on markers to see the GeoCatch image
Scroll in to see the marker change from marker to radius
See a radius that can be explored */

import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../../index.css';
import '../../index.css';
mapboxgl.accessToken = 'pk.eyJ1IjoicmFraWJjYSIsImEiOiJjbDY1Njd1OWsyeTU0M2tvMXpwZmM1MXJkIn0.h4GFYIIYYATzua87c7_EAw';

export default function MapBox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-79.347015);
  const [lat, setLat] = useState(43.651070);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current)
      return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        lng, lat
      ],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current)
      return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (<div>
    <div ref={mapContainer} className="map-container"/>
    <div className="space"/> {
      <div className="map-sidebar">
          Longitude: {lng}
          | Latitude: {lat}
          | Zoom: {zoom}
        </div>
    }
  </div>);
}
