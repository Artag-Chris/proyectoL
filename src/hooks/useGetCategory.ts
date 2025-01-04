import { useState, useEffect } from 'react';
import axios from 'axios';
import { categories, products, soldProducts } from '../utils/dummy/dummy';

export interface Category {
    name: string;
    description: string;
}

const useGetCategories = () => {
    const [data, setData] = useState<{ categories: Category[] }>({
        categories: [],
        
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:45623/api/productos/');
                
                if (response.data.products.length === 0 ) {
                    setData({ categories});
                } else {
                    setData(response.data);
                }
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setData({ categories });
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useGetCategories;