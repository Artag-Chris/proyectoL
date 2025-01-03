"use client"
import { AdminSidebar } from "@/components/admin/sidebar";
import { FadeInTransition } from "@/components/transitions/FadeIn";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      if (status === 'authenticated') {
        const email = session!.user?.email;
        axios.get(`http://localhost:45623/api/usuarios/cliente/${email}`)
          .then(response => {
            setIsAdmin(response.data.isAdmin);
            if (!response.data.isAdmin) {
              router.push('/auth'); // Redirige si no es admin
            }
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
            router.push('/'); // Redirige en caso de error
          });
      } else if (status === 'unauthenticated') {
        router.push('/auth'); // Redirige si no está autenticado
      }
    };
    checkSession();
  }, [status, session, router]);

  if (status === 'loading' || !isAdmin) {
    return null; // Muestra nada mientras se verifica la sesión
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-energy)] to-[var(--color-warmth)]">
      <div className="flex min-h-screen">
        <FadeInTransition position="right">
          <AdminSidebar />
        </FadeInTransition>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}