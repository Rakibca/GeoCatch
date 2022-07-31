/*
Header is a thin sticky bar that follows the color scheme
Top right of the header has a "login/logout" functionality
Clicking login prompts a modal to appear with a username and password
On the modal is a button for login with credentials
Bottom of modal is the sign up button
Ensure Chakra-UI is followed semantically
Header is on every page
*/
import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
    Link
} from "react-router-dom";
import './navbar.css';
import Auth from '../../utils/auth';

const NavBar = () => {
  return(
      <div className="background">
          <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="warning" variant="light">
          <Link to="/">
        <ReactBootStrap.Navbar.Brand href="/">GeoCatch</ReactBootStrap.Navbar.Brand>
        </Link>

        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto"> 
          <Link to="/map">
          <ReactBootStrap.Nav.Link href="#map">GeoCatch Map</ReactBootStrap.Nav.Link>
          </Link>
          {Auth.loggedIn() ? (
<div>
          <Link to="/upload">
          <ReactBootStrap.Nav.Link href="#upload">GeoCatch Upload</ReactBootStrap.Nav.Link>
          </Link>
          <Link to="/profile">
          <ReactBootStrap.Nav.Link href="#profile">Profile</ReactBootStrap.Nav.Link>
          </Link>
          </div>
):(<span />)}
            <ReactBootStrap.NavDropdown title="User" id="collasible-nav-dropdown">
            <Link to="/signup">
              <ReactBootStrap.NavDropdown.Item href="#signup">Signup</ReactBootStrap.NavDropdown.Item>
              </Link>
              <Link to="/login">
              <ReactBootStrap.NavDropdown.Item href="#login">Login</ReactBootStrap.NavDropdown.Item>
              </Link>

              <ReactBootStrap.NavDropdown.Item href="#logout">Logout</ReactBootStrap.NavDropdown.Item>
              <ReactBootStrap.NavDropdown.Divider />
              <ReactBootStrap.NavDropdown.Item href="#subscribe">Subscribe</ReactBootStrap.NavDropdown.Item>
            </ReactBootStrap.NavDropdown>
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
      </div>
  )
}

export default NavBar;