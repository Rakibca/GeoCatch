/*
Image Card is a component that can hold the information of an active GeoCatch 
Display the title, user, image, and a marker with a radius to catch the GeoCatch
Will be rendered underneath the GeoCatch map
*/
import React from "react";
import { Box, Image, Badge } from "@chakra-ui/react";

const GeoCatchCard = () => {
	return (
		<Box
			maxW="sm"
			mx="auto"
			borderWidth="1px"
			borderRadius="10px"
			p={4}
			overflow="hidden"
		>
			<Image src={geoCatchImage} alt={geoCatchTitle} />
			<Box p={4}>
				<Box
					display="flex"
					fontSize="lg"
					fontWeight="bold"
					mb={2}
					alignItems="baseline"
				>
					<Badge borderRadius="full" px="2" colorScheme="teal" py="2">
						{distance}
					</Badge>
					{geoCatchTitle}
				</Box>
				<Box>{distance}</Box>
			</Box>
		</Box>
	);
};

export default GeoCatchCard;