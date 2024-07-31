// src/components/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, GridItem, Image, Text, Spinner, Heading } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PropTypes from "prop-types";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults({ setCategory }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery().get('query');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        setBooks(response.data.items);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchBooks();
    }
  }, [query]);

  return (
    <div>
      <Navbar setCategory={setCategory} />
      <Box p="4" border={'1px solid'} width={'1000px'} position='relative' left={'-40%'}>
        {loading ? (
          <Spinner size="xl" />
        ) : books.length > 0 ? (
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
            {books.map((book) => (
              <GridItem key={book.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" textAlign="center">
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <Box display="flex" justifyContent="center" mb="4">
                    <Image src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                  </Box>
                )}
                <Heading as="h4" size="md" mt={4}>{book.volumeInfo.title}</Heading>
                <Text fontSize="sm" color="gray.500">{book.volumeInfo.authors?.join(', ')}</Text>
                <Text fontSize="md" mt={2}>Price: {book.saleInfo?.retailPrice?.amount || 'N/A'}</Text>
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Text>No results found for {query}</Text>
        )}
      </Box>
      <Footer />
    </div>
  );
}
SearchResults.propTypes = {
    setCategory: PropTypes.func.isRequired,
  };
export default SearchResults;
