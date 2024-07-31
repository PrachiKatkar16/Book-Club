// src/components/Home.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';
import {Box, Flex, Heading,Text,Image,keyframes} from '@chakra-ui/react'
import homeImage from '../../public/digital-library-concept-free-vector.jpg'
import ImageCarousel from './ImageCarousel'
import ImageCarousel1 from './ImageCarousel1'
import ImageCarousel2 from './ImageCarousel2'
import ImageCarousel3 from './ImageCarousel3'
import {Link as RouterLink,useNavigate } from 'react-router-dom'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;


const Home = ({ setCategory }) => {
  return (
    <Box>
      <Navbar setCategory={setCategory} />
      <Box  width={"1280px"} position={"relative"} left={"-350"}  p={"10px"}>
       <Flex justifyContent={"flex-start"}>
          <Box mt={"40px"} animation={`${fadeIn} 4s ease-in-out`}>
            <Heading fontSize={"60px"} >Discover Your Next Great Read at <span style={{ color: 'red' }}>Book Club</span></Heading><br></br>
            <Text fontSize={"18px"} fontWeight={"500"} color={"gray.500"}>Explore a vast collection of books across all genres, enjoy personalized recommendations, and join a vibrant community of readers. At Book Club, finding your next favorite book is effortless and enjoyable.</Text>
          </Box>
          <Box mt={"0"} ml={"90px"} >
            <Image src={homeImage} alt="digital-library" w={"1500px"}/>
          </Box>
       </Flex>
      </Box>
      <Box  width={"1400px"} position={"relative"} left={"-420"}  p={"10px"}>
        < ImageCarousel/>
      </Box>
      <Box  width={"1280px"} position={"relative"} left={"-390"}  p={"10px"}>
        < ImageCarousel1/>
      </Box>
      <Box  width={"1280px"} position={"relative"} left={"-390"}  p={"10px"}>
        <RouterLink to={"/book/:bookName"} >
          < ImageCarousel2/>
        </RouterLink>
      </Box>
      <Footer />
    </Box>
  );
};

Home.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default Home;
