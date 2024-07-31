// src/components/NewArrivals.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Heading, Text, SimpleGrid, Spinner,Grid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';

const NewArrivals = ({ setCategory }) => {

  const moveAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:new');
        setBooks(response.data.items);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <div>
      <Navbar setCategory={setCategory} />
      <Box overflow="hidden" whiteSpace="nowrap" mb="20px" mt="20px" width="100%">
        <Heading
          display="inline-block"
          animation={`${moveAnimation} 15s linear infinite`}
          width="100%"
        >
          New Arrivals
        </Heading>
      </Box>
      <Box w="1000px" p="4" border={'1px solid'} position={'relative'} left={'-40%'}>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {books.map((book) => (
            <RouterLink to={`/book/${book.id}`} key={book.id}>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" textAlign="center">
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <Box display="flex" justifyContent="center" mb="4">
                    <Image src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                  </Box>
                )}
                <Heading as="h4" size="md" mb="2">{book.volumeInfo.title}</Heading>
                <Text fontSize="sm" color="gray.500" mb="2">{book.volumeInfo.authors?.join(', ')}</Text>
                <Text fontSize="md" fontWeight="bold">${book.saleInfo?.retailPrice?.amount || 'N/A'}</Text>
              </Box>
            </RouterLink>
          ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}
NewArrivals.propTypes = {
  setCategory: PropTypes.func.isRequired,
};
export default NewArrivals;
