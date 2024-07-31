import { useState, useEffect } from 'react';
import { Box, Flex, Image, Text, Heading, Button, Spacer, useDisclosure,  HStack,  VStack,  IconButton,  useColorModeValue,  useColorMode,  Grid, GridItem,  Center,  Tooltip, } from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import data from './Data.json';

const App = () => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.700');
  const boxBgColor = useColorModeValue('white', 'gray.700');
  const discountBgColor = useColorModeValue('red.500', 'red.300');
  const priceColor = useColorModeValue('red.500', 'red.300');

  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.trending.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // update every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.trending.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.trending.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box p={4} bg={bgColor}>
      <Heading as="h1" size="lg" mb={4}>Now Trending</Heading>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gap={6}
      >
        {data.trending.map((item, index) => (
          <GridItem key={index}>
            <Box
              bg={boxBgColor}
              boxShadow="md"
              rounded="md"
              p={4}
              display={currentIndex === index ? 'block' : 'none'}
            >
              <Image
                src={item.image}
                alt={item.title}
                borderRadius="md"
                h="200px"
                objectFit="cover"
                mb={4}
              />
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                {item.title}
              </Text>
              <Text fontSize="sm" mb={2}>
                {item.author}
              </Text>
              <HStack mb={2}>
                <Flex alignItems="center">
                  <Box as="span" color="green.500" fontSize="lg">
                    {item.rating}
                  </Box>
                  <Box as="span" fontSize="sm" ml={1}>
                    ({item.reviews})
                  </Box>
                </Flex>
                <Spacer />
                <Box
                  bg={discountBgColor}
                  color="white"
                  p={2}
                  rounded="md"
                >
                  {item.discount}%
                </Box>
              </HStack>
              <HStack>
                <Text
                  as="span"
                  fontWeight="bold"
                  fontSize="lg"
                  color={priceColor}
                >
                  ₹{item.price}
                </Text>
                <Text
                  as="span"
                  fontSize="sm"
                  textDecoration="line-through"
                  ml={2}
                >
                  ₹{item.originalPrice}
                </Text>
              </HStack>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Slider  */}
      <Flex mt={8} justifyContent="center" alignItems="center">
        <IconButton
          aria-label="Previous"
          icon={<FaArrowLeft />}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          colorScheme="blue"
          variant="outline"
        />
        <IconButton
          aria-label="Next"
          icon={<FaArrowRight />}
          onClick={handleNext}
          disabled={currentIndex === data.trending.length - 1}
          colorScheme="blue"
          variant="outline"
        />
      </Flex>
    </Box>
  );
};

export default App;