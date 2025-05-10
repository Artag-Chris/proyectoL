import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetClientStatsResponse } from '@/utils/interfaces/getClientStats';


const useGetClientsStats= () => {
    
    const [data, setData] = useState<{ response: GetClientStatsResponse }>({
        response: {
            totalUsuarios: 0,
            usuariosActivos: 0,
            usuariosInActivos: 0,
            subscriptions: {
                currentMonth: {
                    month: 0,
                    count: 0,

                },
                previousMonth: {
                    month: 0,
                    count: 0,
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
                const response = await axios.get(`http://localhost:45623/api/usuarios/statsClientes`);
                if (!response.data) {
                    setData({ response: { totalUsuarios: 0, usuariosActivos: 0, usuariosInActivos: 0, subscriptions: { currentMonth: { month: 0, count: 0 }, previousMonth: { month: 0, count: 0 }, percentageChange: 0 } } });
                } else {
                    setData({ response: response.data });
                }
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setData({ response: { totalUsuarios: 0, usuariosActivos: 0, usuariosInActivos: 0, subscriptions: { currentMonth: { month: 0, count: 0 }, previousMonth: { month: 0, count: 0 }, percentageChange: 0 } } });
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useGetClientsStats;