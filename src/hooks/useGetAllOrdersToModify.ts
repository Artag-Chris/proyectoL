import { useState, useEffect } from 'react';
import axios from 'axios';
import { GetAllOrdersResponse } from '@/utils/interfaces/ordersRelatedInterfaces';

const useGetAllOrdersToModify = () => {
    const [data, setData] = useState<{ orders: GetAllOrdersResponse[] }>({
        orders: []
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:45623/api/pedidos/all`);
                
                // Si la respuesta es directamente un objeto de orden
                if (response.data && !Array.isArray(response.data) && 'id' in response.data) {
                    setData({ orders: [response.data] });
                }
                // Si la respuesta es un array de órdenes
                else if (Array.isArray(response.data)) {
                    setData({ orders: response.data });
                }
                // Si la respuesta tiene una propiedad orders que es un array
                else if (response.data && Array.isArray(response.data.orders)) {
                    setData(response.data);
                }
                // Si no coincide con ningún formato esperado
                else {
                    throw new Error('Formato de respuesta inválido');
                }
            } catch (err) {
                console.error('Error al obtener pedidos:', err);
                setData({ orders: [] });
                setError(err instanceof Error ? err.message : 'Error al cargar los pedidos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Verificación adicional antes de retornar
    if (!data.orders) {
        return {
            data: { orders: [] },
            loading,
            error: 'No hay datos disponibles'
        };
    }

    return { data, loading, error };
};

export default useGetAllOrdersToModify;