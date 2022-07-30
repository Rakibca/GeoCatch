/*
NavBar is the Footer with three icons/buttons: GeoCatch map, GeoCatch upload image, and User Profile
GeoCatch map has the map with active markers and an array of active GeoCatch cards beneath the map
GeoCatch upload image brings up a modal or renders to ask for: Title, Image file, and location
User profile shows caught/captured GeoCatches and saved/liked GeoCatches to hunt 
*/
import React from 'react';
import "./footer.css"

const Footer = () => {
  return (
    <div className='main-footer'>
      <div className='container'>
        <div className='row'>
          {/* Columns */}
          <div>
            <h4>GeoCatch</h4>
            <ul className='list-unstyled'>
              <li>Canada</li>
            </ul>
          </div>
          <div className='col'>
            <h4>Authors</h4>
            <ul className='list-unstyled'>
              <li>Nathan Howes</li>
              <li>Rakibul Islam</li>
              <li>Trent Dickson</li>
            </ul>
          </div>
          <div className='col'>
            <h4>Made With</h4>
            <ul className='list-unstyled'>
              <li>MapBox</li>
              <li>React</li>
              <li>Apollo-GraphQL</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className='row'>
          <p className='col-sm'>
            &copy;(2022 GeoCatch | All rights reserved | Terms of Service | Privacy)
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer;
