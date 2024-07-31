// src/components/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, Text, Image, Button, HStack, useToast } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ setCategory }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleBuyNow = (itemId) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div>
      <Navbar setCategory={setCategory} />
      <Box maxWidth="1200px" mx="auto" p="4">
        <Heading as="h2" size="lg" mb="4">Shopping Cart</Heading>
        {cartItems.length === 0 ? (
          <Text>Your cart is empty</Text>
        ) : (
          cartItems.map((item) => (
            <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4" display="flex" alignItems="center">
              <Image src={item.volumeInfo.imageLinks?.thumbnail} alt={item.volumeInfo.title} boxSize="100px" />
              <Box ml="4">
                <Heading as="h4" size="md">{item.volumeInfo.title}</Heading>
                <Text fontSize="sm" color="gray.500">{item.volumeInfo.authors?.join(', ')}</Text>
                <Text fontSize="md">Quantity: {item.quantity}</Text>
                <Text fontSize="lg" fontWeight="bold">${item.saleInfo?.retailPrice?.amount || 'N/A'}</Text>
              </Box>
              <HStack spacing={4} ml="auto">
                <Button colorScheme="red" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                <Button colorScheme="blue" onClick={() => handleBuyNow(item.id)} width="full">Buy Now</Button>
              </HStack>
            </Box>
          ))
        )}
      </Box>
      <Footer />
    </div>
  );
};

Cart.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default Cart;
