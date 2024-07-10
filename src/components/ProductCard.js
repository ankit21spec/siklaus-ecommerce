import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ImageCarousel from "./ImageCarousel";

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents the click from propagating to the card's click handler
    onAddToCart(product, quantity);
    alert("Thank you for your interest in our product.");
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <ImageCarousel images={product.images} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          £{product.price}
        </Typography>
        <Box sx={{ my: 2 }}>
          <Select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            displayEmpty
            fullWidth
          >
            {[...Array(10).keys()].map((n) => (
              <MenuItem key={n + 1} value={n + 1}>
                {n + 1}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddToCart}
          startIcon={<ShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
