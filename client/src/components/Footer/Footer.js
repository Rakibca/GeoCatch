/*
NavBar is the Footer with three icons/buttons: GeoCatch map, GeoCatch upload image, and User Profile
GeoCatch map has the map with active markers and an array of active GeoCatch cards beneath the map
GeoCatch upload image brings up a modal or renders to ask for: Title, Image file, and location
User profile shows caught/captured GeoCatches and saved/liked GeoCatches 
*/
import { ButtonGroup, Container, IconButton, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './footer.css';
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";


export const Footer = () => (

<Box width="100%" bgGradient='linear(to-r, #F2DF3A, #0078AA)'>
  <Container width="100%" className="main-footer">
    <Stack width="100%">
      <Stack justify="space-evenly" direction="row" width="100%">
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/rakibul-islam-5719451aa/"
            aria-label="LinkedIn"
            bgGradient='linear(to-r, #F2DF3A, #0078AA)'
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton 
            as="a" 
            href="https://github.com/Rakibca" 
            bgGradient='linear(to-r, #0078AA, #F2DF3A)'
            aria-label="GitHub" 
            icon={<FaGithub fontSize="1.25rem" />} />
        </ButtonGroup>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a" 
            href="https://www.linkedin.com/in/nathan-howes1/"
            bgGradient='linear(to-r, #F2DF3A, #0078AA)'
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton 
            as="a" 
            href="https://github.com/nathanh635" 
            aria-label="GitHub" 
            bgGradient='linear(to-r, #0078AA, #F2DF3A)'
            icon={<FaGithub fontSize="1.25rem" />} />
        </ButtonGroup>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/tad96/"
            aria-label="LinkedIn"
            bgGradient='linear(to-r, #F2DF3A, #0078AA)'
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton 
            as="a" 
            href="https://github.com/tdickson96" 
            aria-label="GitHub" 
            bgGradient='linear(to-r, #0078AA, #F2DF3A)'
            icon={<FaGithub fontSize="1.25rem" />} />
        </ButtonGroup>
      </Stack>
      <Text fontSize="md" color="subtle">
        &copy; {new Date().getFullYear()} Howes, Islam, and Dickson. All rights reserved.
      </Text>
    </Stack>
  </Container>
</Box>

)

export default Footer;
