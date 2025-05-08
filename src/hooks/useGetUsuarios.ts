import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface Usuarios {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  createdAt?: Date;
  isAvailable?: boolean;
  isAdmin?: boolean;
  ImageUrl?: string;
}

const useGetUsuarios = () => {
  const [data, setData] = useState<{ usuarios: Usuarios[] }>({ usuarios: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const localData = localStorage.getItem('usuarios');
      const localDataTimestamp = localStorage.getItem('usuariosTimestamp');
      const now = new Date().getTime();
      const ttl = 1000 * 60 * 60 * 12; // 12 horas

      if (localData && localDataTimestamp && now - parseInt(localDataTimestamp) < ttl) {
        setData({ usuarios: JSON.parse(localData) });
        setLoading(false);
      } else {
        const response = await axios.get('http://localhost:45623/api/usuarios/clientes');
        if (response.data.length === 0) {
          setData({ usuarios: [] });
        } else {

          setData({ usuarios: response.data });
          localStorage.setItem('usuarios', JSON.stringify(response.data));
          localStorage.setItem('usuariosTimestamp', now.toString());
        }
      }
    } catch (err) {
      console.error('Error fetching data', err);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:45623/api/usuarios/clientes');
      if (response.data.length === 0) {
        setData({ usuarios: [] });
      } else {
        console.log('Data updated successfully', response.data);
        setData({ usuarios: response.data });
        localStorage.setItem('usuarios', JSON.stringify(response.data));
        localStorage.setItem('usuariosTimestamp', new Date().getTime().toString());
      }
    } catch (err) {
      console.error('Error refreshing data', err);
      setError('Error refreshing data');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refreshData };
};

export default useGetUsuarios;