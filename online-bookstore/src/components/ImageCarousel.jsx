import React from 'react';
import PropTypes from 'prop-types';
import Data from './Data.json';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Box, Image, IconButton, Heading } from "@chakra-ui/react";

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
      transform="translate(-100%, -100%)"
      zIndex="100"
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
    slidesToShow: 2.5, // Display 6 images per slide
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <Box ml={"30px"} mr={"20px"}> {/* Adjust margins as needed */}
    <Slider {...settings}>
      {Data.image_by_category.map((el) => (
        <Box key={el.imgUrl} w="100%" p={2} marginTop={"20px"} marginBottom={"30px"}>
          <Image src={el.imgUrl} alt={el.imgUrl} borderRadius="15px" height={"340px"} width={"500px"} />
        </Box>
      ))}
    </Slider>
  </Box>
  );
};

export default Carousel;
