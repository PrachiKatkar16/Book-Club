// src/components/Checkout.jsx
import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text, useToast, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../styles/checkout.css'; // Import CSS

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/send-otp', { mobile });
      setGeneratedOtp(response.data.otp);
      toast({
        title: 'OTP Sent',
        description: `OTP has been sent to ${mobile}`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      setStep(2);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send OTP',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleVerifyOtp = async () => {
    if (otp === generatedOtp.toString()) {
      toast({
        title: 'OTP Verified',
        description: 'Mobile number verified successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setStep(3);
    } else {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid OTP',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePlaceOrder = () => {
    toast({
      title: 'Order Placed',
      description: 'Your order has been placed successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/'); // Navigate to home or order confirmation page
  };

  return (
    <Box p="4" maxWidth="600px" mx="auto" className="checkout-container">
      <Heading as="h2" size="lg" mb="4">Checkout</Heading>
      {step === 1 && (
        <VStack spacing="4">
          <Text>Enter your mobile number to receive an OTP</Text>
          <Input
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSendOtp}>Send OTP</Button>
        </VStack>
      )}
      {step === 2 && (
        <VStack spacing="4">
          <Text>Enter the OTP sent to your mobile number</Text>
          <Input
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleVerifyOtp}>Verify OTP</Button>
        </VStack>
      )}
      {step === 3 && (
        <VStack spacing="4">
          <Text>Enter your address information</Text>
          <Input
            placeholder="Address Line 1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
          <Select placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="City 1">City 1</option>
            <option value="City 2">City 2</option>
            <option value="City 3">City 3</option>
          </Select>
          <Select placeholder="State" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="State 1">State 1</option>
            <option value="State 2">State 2</option>
            <option value="State 3">State 3</option>
          </Select>
          <Button colorScheme="blue" onClick={() => setStep(4)}>Next</Button>
        </VStack>
      )}
      {step === 4 && (
        <VStack spacing="4">
          <Text>Select your payment mode</Text>
          <Select placeholder="Payment Mode" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Paytm">Paytm</option>
            <option value="PhonePe">PhonePe</option>
            <option value="Google Pay">Google Pay</option>
          </Select>
          <Button colorScheme="blue" onClick={handlePlaceOrder}>Place Order</Button>
        </VStack>
      )}
    </Box>
  );
};

export default Checkout;
