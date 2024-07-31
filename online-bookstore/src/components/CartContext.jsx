// src/contexts/CartContext.js
import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const addToCart = (book, quantity) => {
    dispatch({ type: 'ADD_TO_CART', payload: { book, quantity } });
  };

  return (
    <CartContext.Provider value={{ cartState, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
export default CartContext;
