import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/" element={<ProductListingPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
