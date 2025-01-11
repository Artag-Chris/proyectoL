import { useState, useEffect } from 'react';
import axios from 'axios';
import { usuarios, product, soldProducts } from '../utils/dummy/dummy';

export interface Usuarios {
    id : number,
    email :       String,
    firstName?  :  String,
    lastName? :    String,
    address?  :    String,
    phoneNumber? : String, 
    createdAt? :  Date,
    isAvailable? : Boolean,
    isAdmin?    :  Boolean 
}

const useGetUsuarios = () => {
    const [data, setData] = useState<{ usuarios: Usuarios[] }>({
        usuarios: [],
        
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:45623/api/usuarios/clientes');      
                
                if (response.data.length === 0 ) {
                    setData({ usuarios});
                } else {
                    setData(response.data);
                }
            } catch (err) {
                console.error('Error fetching data, using dummy data', err);
                setData({ usuarios });
                setError('Error fetching data, using dummy data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useGetUsuarios;