/*
NavBar is the Footer with three icons/buttons: GeoCatch map, GeoCatch upload image, and User Profile
GeoCatch map has the map with active markers and an array of active GeoCatch cards beneath the map
GeoCatch upload image brings up a modal or renders to ask for: Title, Image file, and location
User profile shows caught/captured GeoCatches and saved/liked GeoCatches to hunt 
*/
import { ButtonGroup, Container, IconButton, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './footer.css';
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";


export const Footer = () => (
<Flex
  align="center"
  justify={["center", "space-between", "flex-end", "flex-end"]}
  direction={["column", "row", "row", "row"]}
  pt={[4, 4, 0, 0]}
>
<Box width="full" height={160}>
  <Container className="main-footer" as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
    <Stack spacing={{ base: '2', md: '5' }}>
      <Stack width="100%" justify="space-between" direction="row" align="center" className='col-sm'>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="https://www.linkedin.com/in/rakibul-islam-5719451aa/"
            src=""
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton as="a" href="https://github.com/Rakibca" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        </ButtonGroup>
        <ButtonGroup variant="ghost">
          <IconButton
            href="https://www.linkedin.com/in/nathan-howes1/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton as="a" href="https://github.com/nathanh635" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        </ButtonGroup>
        <ButtonGroup variant="ghost">
          <IconButton
            href="https://www.linkedin.com/in/tad96/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton as="a" href="https://github.com/tdickson96" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        </ButtonGroup>
      </Stack>
      <Text fontSize="md" color="subtle">
        &copy; {new Date().getFullYear()} Howes, Islam, and Dickson. All rights reserved.
      </Text>
    </Stack>
  </Container>
</Box>
</Flex>
)

export default Footer;
