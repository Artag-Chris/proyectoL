import { useState, useEffect } from 'react';
import axios from 'axios';
import { products, soldProducts } from '../utils/dummy/dummy';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

const useGetProducts = () => {
    const [data, setData] = useState<{ products: Product[], soldProducts: Product[] }>({
        products: [],
        soldProducts: []
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:45623/api/productos/');
                
                if (response.data.products.length === 0 && response.data.soldProducts.length === 0) {
                    setData({ products, soldProducts });
                } else {
                    setData(response.data);
                }
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setData({ products, soldProducts });
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useGetProducts;