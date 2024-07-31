// src/components/BookDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Heading, Text, Button, Spinner, Select,useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart ,clearCart} from '../redux/cartSlice';


const BookDetail = ({ setCategory }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

 useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...book, quantity }));
    toast({
      title: 'Item Added',
      description: 'Item is added into cart successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const handleBuyNow = () => {
    navigate('/checkout');
  };
  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!book) {
    return <Text>Book not found</Text>;
  }

  return (
    <div>
      <Navbar setCategory={setCategory} />
      <Box p="4"  border={'1px solid'} width={'1000px'} position='relative' left={'-40%'}>
        <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems="center">
          {book.volumeInfo.imageLinks?.thumbnail && (
            <Image src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} mb="4" />
          )}
          <Box ml={{ md: "4" }}>
            <Heading as="h2" size="lg" mb="4">{book.volumeInfo.title}</Heading>
            <Text fontSize="md" color="gray.500" mb="4">{book.volumeInfo.authors?.join(', ')}</Text>
            <Text fontSize="lg" fontWeight="bold" mb="4">${book.saleInfo?.retailPrice?.amount || 'N/A'}</Text>
            <Text fontSize="md" mb="4">{book.volumeInfo.description}</Text>
            <Select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="Quantity" mb="4">
              {[...Array(10).keys()].map((num) => (
                <option key={num} value={num + 1}>{num + 1}</option>
              ))}
            </Select>
            <Button onClick={handleAddToCart}  colorScheme="red" size="lg" mb="4">Add to Cart</Button>
            <Button onClick={handleBuyNow} colorScheme="blue" size="lg" mb="4" ml="4">Buy Now</Button><br></br>
            <Button variant="outline" size="lg">Add to Wishlist</Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

BookDetail.propTypes = {
    setCategory: PropTypes.func.isRequired,
  };
export default BookDetail;
