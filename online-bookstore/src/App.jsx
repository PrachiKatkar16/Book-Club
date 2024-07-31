// src/App.jsx
import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Routes,Navigate  } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NewArrivals from './components/NewArrivals';
import FictionBooks from './components/FictionBooks';
import HistoricalBooks from './components/HistoricalBooks';
import RomanceBooks from './components/RomanceBooks';
import BookDetail from './components/BookDetail';
import SearchResults from './components/SearchResults';
import Cart from './components/Cart'
import Checkout from './components/Checkout';
import Loading from './components/Loading'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider, useAuth } from './components/AuthContext';
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import logo2 from '../public/logo2.jpg'
import BookDetails from './components/BookDetails';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};
function App() {
  const [category, setCategory] = useState('New arrivals');

  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const startLoading = () => setIsLoading(true);
  //   const endLoading = () => setIsLoading(false);

  //   // Example: add event listeners to manage loading state during navigation
  //   window.addEventListener('beforeunload', startLoading);
  //   window.addEventListener('load', endLoading);

  //   return () => {
  //     window.removeEventListener('beforeunload', startLoading);
  //     window.removeEventListener('load', endLoading);
  //   };
  // }, []);

  return (
    <Provider store={store}>
    <AuthProvider>
    <Box maxW="xl" mx="auto" p={4}>
      <Routes>
        <Route path="/" element={<Home setCategory={setCategory} />} />
        <Route path="/login" element={<Login setCategory={setCategory}/>} />
        <Route path="/books/New arrivals" element={<NewArrivals setCategory={setCategory} />} />
        <Route path="/books/Fiction" element={<FictionBooks setCategory={setCategory} />} />
        <Route path="/books/History" element={<HistoricalBooks setCategory={setCategory} />} />
        <Route path="/books/Romance" element={<RomanceBooks setCategory={setCategory} />} />
        <Route path="/book/:id" element={<BookDetail setCategory={setCategory} />} />
        <Route path="/search" element={<SearchResults setCategory={setCategory} />} />
        <Route path="/cart" element={<Cart setCategory={setCategory} />} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path='/book/:bookName' element={<BookDetails/>}/>

      </Routes>
    </Box>
    </AuthProvider>
    </Provider>
  );
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default App;