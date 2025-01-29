"use client";

import { FadeInTransition } from "@/components/transitions/FadeIn";
import PageTransition from "@/components/transitions/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetUsuarios, { Usuarios } from "@/hooks/useGetUsuarios";
import Image from "next/image";
import { useEffect } from "react";

export default function UsersPage() {
  const { data, loading, error, refreshData } = useGetUsuarios();

  useEffect(() => {
    refreshData();
  }, [refreshData]);  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.usuarios) {
    return <div>No users found.</div>;
  }

  return (
    <div className="space-y-10">
      <PageTransition />
      <h1 className="text-3xl font-bold text-[var(--color-text)]">Usuarios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.usuarios.map((user: Usuarios) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

function UserCard({ user }: { user: Usuarios }) {
  const imageUrl = user.ImageUrl ? String(user.ImageUrl) : "/default-avatar.png";

  return (
    <FadeInTransition position="bottom">
      <Card className="overflow-hidden backdrop-blur-md bg-white/10 border-none">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={user.firstName || "User"}
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardTitle className="text-lg text-[var(--color-text)]">
            {user.firstName} {user.lastName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[var(--color-text)]/80">{user.email}</p>
        </CardContent>
      </Card>
    </FadeInTransition>
  );
}