import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
}

export default function useGetCategoryProducts(categoryId: number | null) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (categoryId === null) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:45623/api/productos/categoria/${categoryId}`);
        console.log('Response:', response);
        if (!response.data) {
          setProducts([]);
        } else {
          setProducts(response.data.productos);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return { products, loading, error };
}