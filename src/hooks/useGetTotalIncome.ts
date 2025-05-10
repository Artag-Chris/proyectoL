import { useState, useEffect } from 'react';
import axios from 'axios';
import { TotalIncomeResponse } from '@/utils/interfaces/getTotalIncomeresponse';

const useGetTotalIncome = () => {
    
    const [data, setData] = useState<{ response: TotalIncomeResponse }>({
        response: {
            message: '',
            data: {
                totalIncome: 0,
                currentMonth: {
                    month: 0,
                    income: 0,
                },
                previousMonth: {
                    month: 0,
                    income: 0,
                },
                percentageChange: 0,
     
            },
        },
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:45623/api/pedidos/totalIncome`);
                if (!response.data) {
                    setData({ response: { message: '', data: { totalIncome: 0, currentMonth: { month: 0, income: 0 }, previousMonth: { month: 0, income: 0 }, percentageChange: 0 } } });
                } else {         
                    setData({ response: response.data });
                }
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setData({ response: { message: '', data: { totalIncome: 0, currentMonth: { month: 0, income: 0 }, previousMonth: { month: 0, income: 0 }, percentageChange: 0 } } });
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useGetTotalIncome;