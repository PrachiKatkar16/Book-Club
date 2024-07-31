import React from 'react';
import Data from './Data.json';
import Slider from 'react-slick';
import { IoStar } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Box, Image, IconButton, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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

const Carousel = () => {
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  const handleBookClick = (book) => {
    // Navigate to the detailed view of the book
    navigate(`/book/${encodeURIComponent(book.name)}`);
  };

  return (
    <Box position="relative" ml="40px" mr="40px" mt="80px" mb="40px">
      <Heading as="h2" size="lg" mb={4} fontFamily="sans-serif">
        New Arrivals
      </Heading>
      <Slider {...settings}>
        {Data.New_Arrivals.map((book, index) => (
          <Box
            key={index}
            p={1}
            width="270px"
            position="relative"
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            transition="box-shadow 0.3s"
            mx="10px"
            _hover={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
            cursor="pointer"
            onClick={() => handleBookClick(book)}// Navigate on book click
          >
            <Image
              src={book.imgUrl}
              alt={book.title}
              borderRadius="md"
              width="140px"
              height="190px"
              mt="20px"
              mb="10px"
              ml="25px"
             
            />
            <Box mt="10px" mb="10px" width="100%">
              <Text mt={4} fontWeight="500" fontSize="15px" height="40px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {book.title}
              </Text>
              <Text mt={2} fontSize="14px" color="gray.600">
                {book.author}
              </Text>
              <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                <IoStar color="gold" />
                <Text ml={1} fontWeight="500" color="red.500">
                  {book.rating}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
