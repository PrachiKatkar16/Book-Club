import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otp, setOtp] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedUser && isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      throw new Error('Wrong credentials');
    }
  };

  const signup = (email, password) => {
    localStorage.setItem('user', JSON.stringify({ email, password }));
  };

  const sendOtp = (mobile) => {
    // Simulate OTP sending
    const generatedOtp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    setOtp(generatedOtp);
    console.log(`OTP sent to ${mobile}: ${generatedOtp}`);
  };

  const verifyOtp = (enteredOtp) => {
    if (otp && enteredOtp == otp) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      setOtp(null);
    } else {
      throw new Error('Invalid OTP');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, signup, sendOtp, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
