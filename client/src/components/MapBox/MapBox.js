/* Component that holds the interactive map where users can see nearby GeoCatches
Click on markers to see the GeoCatch image
Scroll in to see the marker change from marker to radius
See a radius that can be explored */

import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as turf from '@turf/turf'
import '../../index.css';
//import './GeoJSON.js';

export default function MapBox() {

 useEffect(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoicmFraWJjYSIsImEiOiJjbDY5YzZmcGQwcjlnM2tyenJneG9lZTU2In0.e1P3M69Z9tvm0uMWghC1xA';
  var map = new mapboxgl.Map({
    container: 'map', style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [
      -79.347015, 43.651070
    ], // starting position is Toronto area
    zoom: 10 // starting zoom
  });

  //const marker1 = new mapboxgl.Marker().setLngLat([-79.07584417094174, 43.08912611480924]).addTo(map);

  // Data showing potential sites where photo taken
  var photos = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "ID": 1,
          "photoTaken": "yes"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.395380, 43.663790]
        }
      }, {
        "type": "Feature",
        "properties": {
          "ID": 2,
          "photoTaken": ""
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.433020, 43.675820]
        }
      }, {
        "type": "Feature",
        "properties": {
          "ID": 3,
          "photoTaken": "yes"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.380699, 43.654438]
        }
      }, {
        "type": "Feature",
        "properties": {
          "ID": 4,
          "photoTaken": ""
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.389144, 43.641780]
        }
      }, {
        "type": "Feature",
        "properties": {
          "ID": 5,
          "photoTaken": "yes"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.62506265214812, 43.68234294579473]
        }
      }, {
        "type": "Feature",
        "properties": {
          "ID": 6,
          "photoTaken": ""
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.64734718647408, 43.59294007174612]
        }
      }, {
        "type": "Feature",
        "properties": {
          "ID": 7,
          "photoTaken": ""
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.25136505049905, 43.77658477264161]
        }
      }, {
        "type": "Feature",
        "properties": {
          "ID": 8,
          "photoTaken": "yes"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.23152506079813, 43.70978881598362]
        }
      }, {
        "type": "Feature",
        "properties": {
          "ID": 9,
          "photoTaken": "yes"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.3448418925151, 43.77986593754063]
        }
      }
    ]
  };

  // Add the control to the map
  map.addControl(new MapboxGeocoder({accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl}));

  map.on('load', function() {
    map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
      if (error)
        throw error;
      map.addImage('custom-marker', image);

      //Map layers go in here!
      //Add layer to show all photo taken locations
      map.addLayer({
        id: 'photos',
        source: {
          type: 'geojson',
          data: photos
        },
        type: 'circle',
        paint: {
          'circle-color': '#100F0F',
          'circle-radius': 10,
          'circle-opacity': 0.75
        }
      });

      // When the map has finished loading, add a new layer that will be empty
      // at first, but will eventually house our confirmed photo landing sites.
      map.addLayer({
        id: 'photo-truth',
        source: {
          type: 'geojson',
          data: {
            "type": "FeatureCollection",
            "features": []
          }
        },
        type: 'symbol',
        layout: {
          'icon-image': 'custom-marker',
          'icon-size': 0.75,
          'icon-allow-overlap': true
        }
      });

      // Draw the photo search radius on the map
      map.addLayer({
        id: 'search-radius',
        source: {
          type: 'geojson',
          data: {
            "type": "FeatureCollection",
            "features": []
          }
        },
        type: 'fill',
        paint: {
          'fill-color': '#5800FF',
          'fill-opacity': 0.1
        }
      });
    });
  });

  //Click event goes here!
  map.on('click', function(e) {
    var eventLngLat = [e.lngLat.lng, e.lngLat.lat];
    console.log(eventLngLat)
    var searchRadius = makeRadius(eventLngLat, 5000);
    map.getSource('search-radius').setData(searchRadius);
    var featuresInBuffer = spatialJoin(photos, searchRadius);
    map.getSource('photo-truth').setData(turf.featureCollection(featuresInBuffer));
    //console.log(turf.featureCollection(featuresInBuffer));
    //console.log(featuresInBuffer.length);
    if (featuresInBuffer.length > 0) {
      alert('You are near to my photo location');
    }
  });

  //makeRadius function goes here!
  function makeRadius(lngLatArray, radiusInMeters) {
    var point = turf.point(lngLatArray);
    var buffered = turf.buffer(point, radiusInMeters, {units: 'meters'});
    return buffered;
  }

  //spatialJoin function goes here!
  function spatialJoin(sourceGeoJSON, filterFeature) {
    // Loop through all the features in the source geojson and return the ones that
    // are inside the filter feature (buffered radius) and are confirmed landing sites
    var joined = sourceGeoJSON.features.filter(function(feature) {
      return turf.booleanPointInPolygon(feature, filterFeature) && feature.properties.photoTaken === 'yes';
    });
    return joined;
  }
})

  return (<div>
    <div>
      <div id="map"></div>
      <div id="instructions">
        <p>
          <strong>GeoCatch Game</strong>
        </p>
        <p>
          <strong>Click on the map. You will be alerted if you are within 2.5 KM of a photo taken location</strong>
        </p>
      </div>
    </div>
  </div>);
}
