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
import './navbar.css';
import Auth from '../../utils/auth';
import Logout from '../Logout/Logout';

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export default function NavBar() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <ReactBootStrap.Nav>
      <Box w='100%' h='200px' bgGradient='linear(to-r, #0078AA, #F2DF3A)' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
          <Link to="/">
            <ReactBootStrap.Navbar.Brand href="/">GeoCatch: Who Will You Catch?</ReactBootStrap.Navbar.Brand>
          </Link>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://clipartix.com/wp-content/uploads/2016/03/Globe-earth-clipart-black-and-white-free-clipart-images-3.jpg'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/">
                    <ReactBootStrap.NavDropdown.Item href="/">Home</ReactBootStrap.NavDropdown.Item>
                  </Link>
                </MenuItem>
                
                {!Auth.loggedIn() ? (
                <div>
                <MenuItem>
                  <Link to="/signup">
                    <ReactBootStrap.NavDropdown.Item href="/signup">Signup</ReactBootStrap.NavDropdown.Item>
                  </Link>
                </MenuItem>
                
                <MenuItem>
                  <Link to="/login">
                    <ReactBootStrap.NavDropdown.Item href="/login">Login</ReactBootStrap.NavDropdown.Item>
                  </Link>
                </MenuItem>
                </div>
):("")}  

                {Auth.loggedIn() ? (
                <div>
                <MenuItem>
                  <Link to="/subscribe">
                  <ReactBootStrap.NavDropdown.Item href="/subscribe">Subscription</ReactBootStrap.NavDropdown.Item>
                  </Link>
                </MenuItem>
             
                <MenuItem>
                  <Link to="/upload">
                    <ReactBootStrap.NavDropdown.Item href="/upload">GeoCatch Uploads</ReactBootStrap.NavDropdown.Item>
                  </Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <ReactBootStrap.NavDropdown.Item onClick={logout}><Logout /></ReactBootStrap.NavDropdown.Item>
                </MenuItem>
                </div>
):("")}  
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </ReactBootStrap.Nav>
  );
}

// const NavBar = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };
//   return(
//       <div className="background">
//           <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="warning" variant="light">
//           <Link to="/">
//         <ReactBootStrap.Navbar.Brand href="/">GeoCatch</ReactBootStrap.Navbar.Brand>
//         </Link>

//         <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
//           <ReactBootStrap.Nav className="mr-auto"> 
//           <Link to="/map">
//           <ReactBootStrap.Nav.Link href="#map">GeoCatch Map</ReactBootStrap.Nav.Link>
//           </Link>
//           {Auth.loggedIn() ? (
// <div>
//           <Link to="/upload">
//           <ReactBootStrap.Nav.Link href="#upload">GeoCatch Upload</ReactBootStrap.Nav.Link>
//           </Link>
//           <Link to="/me">
//           <ReactBootStrap.Nav.Link href="#profile">Profile</ReactBootStrap.Nav.Link>
//           </Link>
//           </div>
// ):(<span />)}
//             <ReactBootStrap.NavDropdown title="User" id="collasible-nav-dropdown">
//             <Link to="/signup">
//               <ReactBootStrap.NavDropdown.Item href="#signup">Signup</ReactBootStrap.NavDropdown.Item>
//               </Link>
//               <Link to="/login">
//               <ReactBootStrap.NavDropdown.Item href="#login">Login</ReactBootStrap.NavDropdown.Item>
//               </Link>

//               <ReactBootStrap.NavDropdown.Item onClick={logout}>Logout</ReactBootStrap.NavDropdown.Item>
//               <ReactBootStrap.NavDropdown.Divider />
//               <ReactBootStrap.NavDropdown.Item href="#subscribe">Subscribe</ReactBootStrap.NavDropdown.Item>
//             </ReactBootStrap.NavDropdown>
//           </ReactBootStrap.Nav>
//           <ReactBootStrap.Nav>
//           </ReactBootStrap.Nav>
//         </ReactBootStrap.Navbar.Collapse>
//         </ReactBootStrap.Navbar>
//       </div>
//   )
// }
