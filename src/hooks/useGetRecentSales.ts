import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the interfaces for the data structure
interface Sale {
  id: number;
  name: string;
  email: string;
  amount: string;
  amountValue: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  avatar?: string;
  isVip?: boolean;
  trend?: 'up' | 'down' | 'neutral';
}

interface RecentSalesResponse {
  message: string;
  data: Sale[];
}

const useGetRecentSales = () => {
  const [data, setData] = useState<RecentSalesResponse>({
    message: '',
    data: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RecentSalesResponse>(
          'http://localhost:45623/api/pedidos/ventasRecientes'
        );

        if (!response.data) {
          throw new Error('No data received from server');
        }

        setData(response.data);
      } catch (err) {
        console.error('Error fetching recent sales:', err);
        setError(err instanceof Error ? err.message : 'Error fetching recent sales');
        // Set empty data structure instead of undefined
        setData({
          message: 'Error loading data',
          data: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Optional: Set up polling for real-time updates
    const interval = setInterval(fetchData, 60000); // Update every minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return { 
    sales: data.data, 
    message: data.message,
    loading, 
    error 
  };
};

export default useGetRecentSales;