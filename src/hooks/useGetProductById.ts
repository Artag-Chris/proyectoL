import { useState, useEffect } from 'react';
import axios from 'axios';
import { categories, producto, soldProducts } from '../utils/dummy/dummy';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl?: string;
}

const useGetProductById = (id: number) => {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:45623/api/productos/${id}`);
        console.log(response.data)
        if (!response.data) {
          setData(  producto);
        } else {
          setData(response.data);
        }
      } catch (err) {
        console.error('Error fetching data, using dummy data', err);
        setData(producto);
        setError('Error fetching data, using dummy data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};

export default useGetProductById;