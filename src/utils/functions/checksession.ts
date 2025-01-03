import axios from "axios";
import { getSession, useSession } from "next-auth/react";

export  async function checkSession( )  {
    const session = await getSession()
    const { data: status }: { data: any; status: string } = useSession();
    
   const  email  = session!.user?.email
  
    if (status === 'authenticated') {
   const  usuario = await axios.get(`http://localhost:45623/api/usuarios/cliente/${email}`)
        .then(response => {
          console.log("se disparo la funcion")
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
        })
      return usuario
    }
}
    
