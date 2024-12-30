'use client'

import { FadeInTransition } from "@/components/transitions/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// Datos dummy para usuarios
interface User {
    id: number;
    name: string;
    email: string;
    image: string;
}

const users: User[] = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", image: "/placeholder.svg" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", image: "/placeholder.svg" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", image: "/placeholder.svg" },
    { id: 4, name: "Diana Ross", email: "diana@example.com", image: "/placeholder.svg" },
    { id: 5, name: "Ethan Hunt", email: "ethan@example.com", image: "/placeholder.svg" },
    { id: 6, name: "Fiona Apple", email: "fiona@example.com", image: "/placeholder.svg" },
]

export default function UsersPage() {
    return (
        <div className="space-y-10">
            <h1 className="text-3xl font-bold text-[var(--color-text)]">Usuarios</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    )
}

function UserCard({ user }: any) {
    return (
        <FadeInTransition position="bottom"> 
        <Card className="overflow-hidden backdrop-blur-md bg-white/10 border-none">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                        src={user.image}
                        alt={user.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <CardTitle className="text-lg text-[var(--color-text)]">{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-[var(--color-text)]/80">{user.email}</p>
            </CardContent>
        </Card>
        </FadeInTransition>
    )
}

