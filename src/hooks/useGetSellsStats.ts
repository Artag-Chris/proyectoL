import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetsellStatsResponse } from '@/utils/interfaces/getSellsResponse';

const useGetSellsStats= () => {
    
    const [responseData, setResponseData] = useState<{ response: GetsellStatsResponse }>({
        response: {
            message: {
                total: '0',
                currentMonth: '0',
                previousMonth: '0',
                changes:'0',
            },
            data:{
                totalVentas: { count: 0, amount: 0 },
                currentMonth: { month: 0, count: 0, amount: 0 },
                previousMonth: { month: 0, count: 0, amount: 0 },
                changes: { incomePercentage: 0, countPercentage: 0 },
            }
        }
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:45623/api/pedidos/stats`);
                if (!response.data) {
                    setResponseData({ response: { message: { total: '0', currentMonth: '0', previousMonth: '0', changes:'0' }, data:{ totalVentas: { count: 0, amount: 0 }, currentMonth: { month: 0, count: 0, amount: 0 }, previousMonth: { month: 0, count: 0, amount: 0 }, changes: { incomePercentage: 0, countPercentage: 0 } } } });
                } else {
                    setResponseData({ response: response.data });
                }
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setResponseData({ response: { message: { total: '0', currentMonth: '0', previousMonth: '0', changes:'0' }, data:{ totalVentas: { count: 0, amount: 0 }, currentMonth: { month: 0, count: 0, amount: 0 }, previousMonth: { month: 0, count: 0, amount: 0 }, changes: { incomePercentage: 0, countPercentage: 0 } } } });
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { responseData, loading, error };
};

export default useGetSellsStats;