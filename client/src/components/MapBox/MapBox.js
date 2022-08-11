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
import MapList from '.././MapList/MapList';
import {useQuery} from '@apollo/client';
import {QUERY_POSTS} from '../../utils/queries';
import { Link } from 'react-router-dom';
// 1. Import the utilities
import { extendTheme } from '@chakra-ui/react';
import { Modal, Button } from 'react-bootstrap';

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

// 3. Extend the theme
const theme = extendTheme({ breakpoints })


export default function MapBox() {

let lat;
let lon;

  const {loading, data} = useQuery(QUERY_POSTS);
  let posts = data
    ?.posts || [];

  var myGeoJSON = {};
  myGeoJSON.type = "FeatureCollection";
  myGeoJSON.features = [];
  for (let i = 0; i < posts.length; i++) {
    myGeoJSON.features[i] = {
      type: "Feature",
      properties: {
        image: posts[i].image,
        user: posts[i]._id,
        title: posts[i].title

      },
      geometry: {
        type: "Point",
        coordinates: [
          posts[i].location[1],
          posts[i].location[0]
        ]
      }
    }
  }

 

  // Data showing potential sites where photo taken
  var photos = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "image": "Cat.jpg",
          "user": "62e2daeda656ec21bcc08559",
          "title": "GeoCatch title 1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.395380, 43.663790]
        }
      }, {
        "type": "Feature",
        "properties": {
          "image": "dog.jpg",
          "user": "62e2daeda656ec21bcc0855a",
          "title": "GeoCatch title 2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.433020, 43.675820]
        }
      }, {
        "type": "Feature",
        "properties": {
          "image": "bird.jpg",
          "user": "62e2daeda656ec21bcc0855b",
          "title": "GeoCatch title 3"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.380699, 43.654438]
        }
      }, {
        "type": "Feature",
        "properties": {
          "image": "house.jpg",
          "user": "62e2daeda656ec21bcc0855c",
          "title": "GeoCatch title 4"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.389144, 43.641780]
        }
      }, {
        "type": "Feature",
        "properties": {
          "image": "waterfall.jpg",
          "user": "62e2daeda656ec21bcc0855c",
          "title": "GeoCatch title 5"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-79.625062, 43.682342]
        }
      }
    ]
  };

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFraWJjYSIsImEiOiJjbDY5YzZmcGQwcjlnM2tyenJneG9lZTU2In0.e1P3M69Z9tvm0uMWghC1xA';
    var map = new mapboxgl.Map({
      container: 'map', style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [
        -79.3832, 43.6532
      ], // starting position is in Toronto area
      zoom: 10 // starting zoom
    });

    //const marker1 = new mapboxgl.Marker().setLngLat([-79.07584417094174, 43.08912611480924]).addTo(map);

    // add markers to map
    for (const feature of myGeoJSON.features) {
      // create a HTML element for each location
      const el = document.createElement('div');
      el.className = 'marker';
      // create a marker for each feature and add to the map
      console.log(feature.properties.user)
      new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).setPopup(new mapboxgl.Popup({offset: 25}). // add popups

          setHTML(`<h3>${feature.properties.title}</h3><a href=${feature.properties.image}><img src=${feature.properties.image} /></a>`)).addTo(map)
    }

    //Assign a unique ID to each store
    myGeoJSON.features.forEach(function(photo, i) {
      photo.properties.id = i;
    });

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
          id: 'locations',
          source: {
            type: 'geojson',
            data: myGeoJSON
          },
          type: 'circle',
          paint: {
            'circle-color': '#100F0F',
            'circle-radius': 10,
            'circle-opacity': 0.75
          }
        });

        // When the map has finished loading, add a new layer that will be empty
        // at first, but will eventually house our confirmed photo taken sites.
        map.addLayer({
          id: 'photo-area',
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
      lat = e.lngLat.lat;
      lon = e.lngLat.lng;
      document.getElementById("longitude").textContent = e.lngLat.lng;
      document.getElementById("latitude").textContent = e.lngLat.lat;
      console.log(eventLngLat);
      let radius = 5000;
      var searchRadius = makeRadius(eventLngLat, radius);
      map.getSource('search-radius').setData(searchRadius);
      var featuresInBuffer = spatialJoin(myGeoJSON, searchRadius);
      //var featuresInBuffer = spatialJoin(myGeoJSON, searchRadius);
      map.getSource('photo-area').setData(turf.featureCollection(featuresInBuffer));
      //console.log(turf.featureCollection(featuresInBuffer));
      console.log(featuresInBuffer);
      if (featuresInBuffer.length > 0) {
        alert(`There are ${featuresInBuffer.length} geocatches in 5 km! Click the link in the sidebar to view!`) 
      } else {
        alert(`There are no geocatches in the area yet!`);
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
      //console.log(sourceGeoJSON)
      // Loop through all the features in the source geojson and return the ones that
      // are inside the filter feature (buffered radius) and are confirmed photo taken sites
      var joined = sourceGeoJSON.features.filter(function(feature) {
        return turf.booleanPointInPolygon(feature, filterFeature);
      });
      return joined;
    }
  })

  return (<div>
    <div>
      <div className='sidebar font-bold' bgGradient='linear(to-r, #0078AA, #F2DF3A)'>
        <div className='heading' bgGradient='linear(to-r, #0078AA, #F2DF3A)'>
          <h1 className="text-xs sm:text-small md:text-base lg:text-lg xl:text-xl">Instructions</h1>
        </div>
        <div className="rules" class="text-xs sm:text-small md:text-base lg:text-lg xl:text-xl">
          <div>
            <p>1. Login to GeoCatch</p>
          </div>
          <br />
          <div>
            <p>2. Upload a GeoCatch</p>
          </div>
          <br />
          <div>
            <p>3. Travel to a GeoCatch</p>
          </div>
          <br />
          <div>
            <p>4. Respond to a GeoCatch</p>
          </div>
          <br />
          <div>
            <p>5. Click on the map to be alerted if you are within 5km of a GeoCatch</p>
          </div>
          <br />
          <div>
        <h4>Location Search:</h4>
        <p className= "label1" id="latitude"> </p>
        <p className= "label1" id="longitude"> </p>

        <br />

        <Link to={`/maplist`}>Click HERE to view the geocatches in this area!</Link>

              </div>


        </div>
      </div>
      
      <div className="absolute" id="map"></div>

   </div>

  </div>
  );
}
