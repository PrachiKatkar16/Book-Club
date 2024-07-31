import React from 'react';
import PropTypes from 'prop-types';
import Data from './Data.json';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Box, Image, IconButton, Heading, Text } from "@chakra-ui/react";

// Arrow components using Chakra UI
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IconButton
      icon={<IoIosArrowForward />}
      className={className}
      onClick={onClick}
      bg="rgba(0, 0, 0, 0.5)"
      color="white"
      borderRadius="full"
      position="absolute"
      top="50%"
      right="0"
      transform="translate(50%, -50%)"
      zIndex="50"
      _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
    />
  );
}

NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IconButton
      icon={<IoIosArrowBack />}
      className={className}
      onClick={onClick}
      bg="rgba(0, 0, 0, 0.5)"
      color="white"
      borderRadius="full"
      position="absolute"
      top="50%"
      left="0"
      transform="translate(-50%, -50%)"
      zIndex="50"
      _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
    />
  );
}

PrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const Carousel = () => {
  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 6, // Display 7 images per slide
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true, // Disable autoplay
    arrows: true,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 7, slidesToScroll: 1 }, // Adjust for larger screens
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5, slidesToScroll: 1 }, // Adjust for medium screens
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 1 }, // Adjust for small screens
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1 }, // Adjust for very small screens
      },
    ],
  };

  return (
    <Box  position="relative" 
    ml={"40px"}
    mr={"40px"}
    mt={"80px"}
    mb={"40px"}> {/* Adjust margins as needed */}
      <Heading as="h2" size="lg" mb={4} fontFamily={"sans-serif"}>BestSeller Books</Heading>
      <Slider {...settings}>
        {Data.bestseller_books.map((el, index) => (
          <Box
          key={index}
          p={1}
          width="290px"
          position="relative"
          textAlign="center"
          display="flex"
          flexDirection="column"
          
          alignItems="center"
          transition="box-shadow 0.3s"
          // border={"1px solid"}
          _hover={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
         
         
            

          > 
             <Image
              src={el.imgUrl}
              alt={el.title}
              borderRadius="md"
              width="140px"
              height="190px"
              mt="20px"
              mb="10px"
              ml={"25px"}
            />
            <Box mt="10px" mb="10px" width="100%">
              <Text mt={4} fontWeight="500" fontSize="15px" height="40px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{el.name}</Text>
              <Text mt={2} fontSize="14px" color="gray.600">{el.author}</Text>
              <Text color={"red.500"} fontWeight={"500"}>{el.price}</Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
