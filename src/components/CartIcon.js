import React, { useContext } from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartIcon = () => {
  const { cartItems } = useContext(CartContext);
  const history = useNavigate();

  const handleCartClick = () => {
    history('/cart');
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <IconButton color="inherit" onClick={handleCartClick}>
      <Badge badgeContent={totalItems} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
