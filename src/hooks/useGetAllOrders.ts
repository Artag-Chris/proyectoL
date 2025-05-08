import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetAllOrdersResponse } from '@/utils/interfaces/ordersRelatedInterfaces';

const useGetAllOrders = () => {
    const [data, setData] = useState<{ orders: GetAllOrdersResponse[] }>({
        orders: [],
     
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:45623/api/pedidos/all`);
               
                if (!response.data) {
                    
                    setData({ orders: [] });
                } else {
                   
                    setData({ orders: response.data });
                }
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setData({ orders: [],});
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useGetAllOrders;