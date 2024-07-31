import React from 'react';
import { useParams } from 'react-router-dom';
import Data from './Data.json';
import { Box, Image, Heading, Text, Button, Select } from '@chakra-ui/react';

const BookDetails = () => {
  const { bookName } = useParams();
  const book = Data.New_Arrivals.find((book) => book.name === decodeURIComponent(bookName));

  if (!book) {
    return <Box>No book found.</Box>;
  }

  return (
    <Box ml="40px" mr="40px" mt="80px" mb="40px">
      <Heading as="h2" size="lg" mb={4} fontFamily="sans-serif">
        {book.name}
      </Heading>
      <Box display="flex">
        <Image src={book.imgUrl} alt={book.title} borderRadius="md" width="200px" height="280px" mr="20px" />
        <Box>
          <Text fontSize="18px" fontWeight="500" mb={2}>
            Author: {book.author}
          </Text>
          <Text fontSize="16px" color="gray.600" mb={4}>
            Rating: {book.rating}
          </Text>
          <Text fontSize="16px" mb={4}>
            {book.description}
          </Text>
          <Box display="flex" alignItems="center" mb={4}>
            <Select placeholder="Select Quantity" mr={4}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
            <Button colorScheme="blue" mr={2}>
              Add to Cart
            </Button>
            <Button colorScheme="green" mr={2}>
              Buy Now
            </Button>
            <Button colorScheme="purple">Add to Wishlist</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetails;
