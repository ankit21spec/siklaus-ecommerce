import { useState, useEffect } from 'react';
import { getProducts } from '../utils/api';

export const useProducts = ({ searchQuery, sort, filter, page }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        let filteredProducts = data;

        // Apply search filter
        if (searchQuery) {
          filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Apply category filter
        if (filter) {
          filteredProducts = filteredProducts.filter(
            product => product.category.name === filter
          );
        }

        // Apply sorting
        if (sort === 'asc') {
          filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
          filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        }

        setTotalProducts(filteredProducts.length);

        // Apply pagination
        const startIndex = (page - 1) * 10;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + 10);

        setProducts(paginatedProducts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, sort, filter, page]);

  return { products, loading, error, totalProducts };
};
