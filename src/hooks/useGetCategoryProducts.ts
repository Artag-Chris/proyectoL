import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  tags?: string[];
  isSale?: boolean;
  stock?: number;
  categoryId?: number;
  discount?: boolean;
  isNew?: boolean;
  rating?: number;
  category?: any;
}

export default function useGetCategoryProducts(categoryId: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
// console.log('categoryId:', categoryId);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:45623/api/productos/categoria/${categoryId}`);
     
        if (!response.data) {
          setProducts([]);
        } else {
          setProducts(response.data);
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