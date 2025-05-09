import { useState, useEffect } from 'react';
import axios from 'axios';
import { MetricInterface } from '@/utils/interfaces/getMetricsInterface';

const useGetMetricsGraph = () => {
    const [data, setData] = useState<{ metrics: MetricInterface }>({
        metrics: {
       message:'',
       data:[
        {
            month: 'Ene',
            revenue: 0,
            users: 0,
        },{
            month: 'Feb',
            revenue: 0,
            users: 0,
        },{
            month: 'Mar',
            revenue: 0,
            users: 0,
        },{
            month: 'Abr',
            revenue: 0,
            users: 0,
        },{
            month: 'May',
            revenue: 0,
            users: 0,
        },{
            month: 'Jun',
            revenue: 0,
            users: 0,
        },{
            month: 'Jul',
            revenue: 0,
            users: 0,
        },{
            month: 'Ago',
            revenue: 0,
            users: 0,
        },{
            month: 'Sep',
            revenue: 0,
            users: 0,
        },{
            month: 'Oct',
            revenue: 0,
            users: 0,
        },{
            month: 'Nov',
            revenue: 0,
            users: 0,
        },{
            month: 'Dic',
            revenue: 0,
            users: 0,
        },
       ]
        },
     
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:45623/api/admin/metrics`);
              
                if (!response.data) {
                    
                    setData({ metrics: { message: '', data: [] } });
                } else {
                   
                    setData({ metrics: { message: '', data: response.data.data } });
                }
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setData({ metrics: { message: '', data: [] } });
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useGetMetricsGraph;