import { useState, useEffect } from 'react';
import axios from 'axios';
import { product, soldProducts } from '../utils/dummy/dummy';


interface Product {
    categoryId: number;
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    isAvailable?: boolean;
    stock?: number;
}

const useGetAllProducts = () => {
    const [data, setData] = useState<{ product: Product[], soldProducts: Product[] }>({
        product: [],
        soldProducts: []
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:45623/api/productos/`);
                if (!response.data.products && !response.data.soldProducts) {
                    setData(response.data)
                } else {
                    const { product, soldProducts } = response.data
                    console.log('Fetched data:', response.data);
                    setData(response.data);
                }
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setData({ product, soldProducts });
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useGetAllProducts;