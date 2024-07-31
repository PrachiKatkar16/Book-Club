import React from 'react';
import { Box, Spinner, Image } from '@chakra-ui/react'; // Replace with your UI library components
import PropTypes from 'prop-types';
import logo from '../../public/logo2.jpg'

const Loading = ({ logo}) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.5)" // Semi-transparent black overlay
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="9999" // Ensure it's above everything else
    >
      <Box textAlign="center">
        <Image src={logo} alt="Logo" width="100px" height="100px" mb="4" /> {/* Replace with your logo */}
        <Spinner size="xl" color="white" /> {/* Customize spinner size and color */}
      </Box>
    </Box>
  );
};

Loading.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default Loading;
