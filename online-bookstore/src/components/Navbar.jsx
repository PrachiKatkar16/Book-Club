import React, { ReactElement, ReactNode } from "react";
import { Flex,Box,Image,Link, Heading,InputGroup,InputLeftElement,Input,InputRightAddon,Button,Text, HStack,Menu,MenuItem,MenuButton,MenuList, Divider,List,ListItem} from "@chakra-ui/react"
import { Icon,Search2Icon } from "@chakra-ui/icons";
import {FaUserCircle,FaRegHeart} from 'react-icons/fa'
import {PiShoppingCartSimple} from 'react-icons/pi'
import {Link as RouterLink,useNavigate } from 'react-router-dom'
import { useState } from "react";
import PropTypes from "prop-types";
import logo from '/logo2.jpg'
import '../styles/navbar.css'
import axios from 'axios';


function Navbar({setCategory}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setCategory(category);
    navigate(`/books/${category}`);
  };
  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
      );
      setSuggestions(response.data.items);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.volumeInfo.title);
    navigate(`/book/${suggestion.id}`);
    setSuggestions([]);
  };

  return (
    <Box className="parent" >
      <Box className="child1">
        <Box className="logo">
           <Image src={logo} alt="Logo"  w={{ base: '100px', md: '150px' }} />
        </Box>
        
            <Box className="searchbar">
              <InputGroup borderRadius={5} size="sm" >
                <InputLeftElement
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={<Search2Icon color="black" />}
                />
                <Input type="text" placeholder="Title,Author..." border="1px solid red"  width={{ base: '200px', md: '400px' }}   
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      _hover={{ borderColor: 'red' }}
                      _focus={{ borderColor: 'red', boxShadow: '0 0 0 1px red' }}
                />
                <InputRightAddon
                  p={0}
                  border="none"
                >
                  <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="2px solid red" color={'white'} bg={'red'}
                    onClick={handleSearch}
                    _hover={{ borderColor: 'red' }}
                    _focus={{ borderColor: 'red', boxShadow: '0 0 0 1px red' }}>
                    Search
                  </Button>
                </InputRightAddon>
              </InputGroup>
              {suggestions.length > 0 && (
              <List
              position="absolute"
              zIndex="10"
              bg="white"
              border="1px solid #ccc"
              borderRadius="md"
              mt={2}
              width="100%"
              maxH="200px"
              overflowY="auto"
              >
              {suggestions.map((suggestion) => (
                <ListItem
                  key={suggestion.id}
                  p={2}
                  borderBottom="1px solid #eee"
                  cursor="pointer"
                  _hover={{ backgroundColor: "gray.100" }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Text>{suggestion.volumeInfo.title}</Text>
                </ListItem>
              ))}
            </List>
          )}
            </Box>
            <Box className="myaccount">
                {/* <Flex direction={'row'} gap={8} margin={'30px'}> */}
                  <HStack  gap={3} height={'30px'}>
                    <Icon as={FaUserCircle} w="30px" h="full" color={'red'} />
                    <RouterLink to="/login">
                      <Link size={'sm'}>My Account</Link>
                    </RouterLink>
                    <Divider orientation="vertical" borderColor={'red'}/>
                    <RouterLink to="/cart">
                      <Icon as={PiShoppingCartSimple}  w="30px" h="full" color={'red'}/>
                    </RouterLink>
                  </HStack>
                  
                    
                  
                {/* </Flex> */}
            </Box>
        
        </Box>
    
    <Box className="menuItems" >
        
        <Menu>
            <MenuButton as={Link}>All Categories</MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleCategoryClick('New arrivals')}>New arrivals</MenuItem>
              <MenuItem onClick={() => handleCategoryClick('Fiction')}>Fiction Books</MenuItem>
              <MenuItem onClick={() => handleCategoryClick('History')}>Historical Books</MenuItem>
              <MenuItem onClick={() => handleCategoryClick('Romance')}>Romance</MenuItem>
            </MenuList>
          </Menu>
          
          <Link onClick={() => handleCategoryClick('New arrivals')}>New arrivals</Link>
          <Link onClick={() => handleCategoryClick('Fiction')}>Fiction Books</Link>
          <Link onClick={() => handleCategoryClick('History')}>Historical Books</Link>
          <Link onClick={() => handleCategoryClick('Romance')}>Romance</Link>
       
      
    </Box>
  </Box>
    
      
   
  )
}
Navbar.propTypes = {
  setCategory: PropTypes.func.isRequired,
};


export default Navbar