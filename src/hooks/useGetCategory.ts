import { useState, useEffect } from 'react';
import axios from 'axios';
import { categories as dummyCategories } from '../utils/dummy/dummy';

export interface Category {
    name: string;
    description: string;
    isAvailable: boolean;
    id: number;
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
                const response = await axios.get('http://localhost:45623/api/productos/categorias');
                console.log('Response:', response);
                if (response.data.categories.length === 0) {
                    setData({ categories: dummyCategories });
                } else {
                    setData(response.data);
                }
                localStorage.setItem('categories', JSON.stringify(response.data));
                localStorage.setItem('categoriesTimestamp', Date.now().toString());
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setData({ categories: dummyCategories });
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        const storedCategories = localStorage.getItem('categories');
        const storedTimestamp = localStorage.getItem('categoriesTimestamp');
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (storedCategories && storedTimestamp && currentTime - parseInt(storedTimestamp) < twentyFourHours) {
            setData(JSON.parse(storedCategories));
            setLoading(false);
        } else {
            fetchData();
        }
    }, []);

    return { data, loading, error };
};

export default useGetCategories;