import { useState, useEffect } from 'react';
import axios from 'axios';
import { product, soldProducts } from '../utils/dummy/dummy';
import { useCategoryStore } from '@/utils/store/categoryStore';

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

const useGetProducts = () => {
    const [data, setData] = useState<{ product: Product[], soldProducts: Product[] }>({
        product: [],
        soldProducts: []
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const id = useCategoryStore((state) => state.selectedCategoryId);
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const response = await axios.get(`http://localhost:45623/api/productos/latest/${id}`);
                if (!response.data.products && !response.data.soldProducts) {
                    setData(response.data)
                } else {
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
    }, [id]);

    return { data, loading, error };
};

export default useGetProducts;