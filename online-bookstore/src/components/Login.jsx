import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';
import img from '/bgforlogin.jpg'; // Ensure the path to the image is correct

const Login = ({ setCategory }) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { login, signup, sendOtp, verifyOtp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        login(email, password);
        sendOtp(mobile);
        setIsOtpMode(true);
        toast({
          title: 'OTP Sent',
          description: `OTP has been sent to ${mobile}`,
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } else {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        signup(email, password);
        sendOtp(mobile);
        setIsOtpMode(true);
        toast({
          title: 'Signup Successful',
          description: 'OTP has been sent to your mobile number',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      verifyOtp(otp);
      toast({
        title: 'OTP Verified',
        description: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      const redirectTo = location.state?.from || '/checkout';
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleForm = () => {
    setIsLoginMode(!isLoginMode);
    setEmail('');
    setMobile('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Navbar setCategory={setCategory} />
      <Box
        flex="1"
        width="1540px"
        position={'relative'}
        left={'-92%'}
        backgroundImage={`url(${img})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          maxWidth="450px"
          width="100%"
          p="4"
          borderWidth="1px"
          borderRadius="lg"
          background="white"
          boxShadow="lg"
          margin={'20px'}
          marginBottom={'20px'}
        >
          {isOtpMode ? (
            <>
              <Heading as="h2" size="lg" textAlign="center" mb="4">
                Verify OTP
              </Heading>
              <VStack spacing="4">
                <FormControl id="otp">
                  <FormLabel>Enter OTP</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter the OTP sent to your mobile"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </FormControl>
                <Button colorScheme="red" width="full" onClick={handleOtpSubmit}>
                  Verify OTP
                </Button>
              </VStack>
            </>
          ) : isLoginMode ? (
            <>
              <Heading as="h2" size="lg" textAlign="center" mb="4">
                Login
              </Heading>
              <VStack spacing="4">
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="mobile">
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button colorScheme="red" width="full" onClick={handleSubmit}>
                  Log In
                </Button>
                <Text textAlign="center">
                  Do not have an account?{' '}
                  <Button variant="link" colorScheme="red" onClick={toggleForm}>
                    Sign Up
                  </Button>
                </Text>
              </VStack>
            </>
          ) : (
            <>
              <Heading as="h2" size="lg" textAlign="center" mb="4">
                Sign Up
              </Heading>
              <VStack spacing="4">
                <FormControl id="name">
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="mobile">
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl id="confirm-password">
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
                <Button colorScheme="red" width="full" onClick={handleSubmit}>
                  Sign Up
                </Button>
                <Text textAlign="center">
                  Already have an account?{' '}
                  <Button variant="link" colorScheme="red" onClick={toggleForm}>
                    Log In
                  </Button>
                </Text>
              </VStack>
            </>
          )}
        </Box>
      </Box>
      <Box margin={'20px'}>
        <Footer />
      </Box>
    </Box>
  );
};

Login.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default Login;
