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
import { Link } from 'react-router-dom';

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
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
      <Box w='100%' h='100%' bgGradient='linear(to-r, #0078AA, #F2DF3A)' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
          <Link to="/">
            <ReactBootStrap.Navbar.Brand class="text-2xl">GeoCatch</ReactBootStrap.Navbar.Brand>
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
              <Link to="/">
                <MenuItem>
                    Home
                  </MenuItem>
                </Link>
                {!Auth.loggedIn() ? (
                <div>
                 <Link to="/signup">
                <MenuItem>

                    Signup
                    </MenuItem>
                  </Link>
                
                  <Link to="/login">
                <MenuItem>

                    Login
                    </MenuItem>
                  </Link>

                </div>
):("")}  

                {Auth.loggedIn() ? (
                <div>
                                    <Link to="/profile">
                <MenuItem>Profile

                </MenuItem>
                </Link>   
                <Link to="/upload">
                <MenuItem>GeoCatch Uploads

                </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem onClick={logout}>Logout
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

