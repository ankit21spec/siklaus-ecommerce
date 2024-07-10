import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { getProducts } from '../utils/api';

const SearchBar = ({ setSearchQuery }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setOptions(data.map(product => product.title));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleOptionSelect = (event, value) => {
    setSearchQuery(value);
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect}
      renderInput={(params) => (
        <TextField {...params} label="Search Products" variant="outlined" fullWidth />
      )}
    />
  );
};

export default SearchBar;
