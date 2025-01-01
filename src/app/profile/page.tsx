'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ShoppingBag, Settings, User } from 'lucide-react'
import { Footer } from '@/components/components/footer'
import { Navbar } from '@/components/components/navbar'

// Datos dummy para pedidos recientes
const recentOrders = [
  { id: '1', date: '2023-05-15', total: 59.99, status: 'Entregado' },
  { id: '2', date: '2023-06-02', total: 89.99, status: 'En camino' },
  { id: '3', date: '2023-06-20', total: 39.99, status: 'Procesando' },
]

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Cargando...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/auth')
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-[var(--color-text)]">Mi Perfil</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información del usuario */}
          <Card className="md:col-span-1 glass-card">
            <CardHeader>
              <CardTitle>Información del Usuario</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={session?.user?.image || '/placeholder.svg?height=128&width=128'}
                  alt={session?.user?.name || 'Usuario'}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{session?.user?.name}</h2>
              <p className="text-[var(--color-text)]/80">{session?.user?.email}</p>
            </CardContent>
          </Card>

          {/* Pestañas de contenido */}
          <div className="md:col-span-2">
            <Tabs defaultValue="orders">
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="orders">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Pedidos
                </TabsTrigger>
                <TabsTrigger value="account">
                  <User className="w-4 h-4 mr-2" />
                  Cuenta
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Pedidos Recientes</CardTitle>
                    <CardDescription>Historial de tus últimos pedidos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {recentOrders.map((order) => (
                        <motion.li
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex justify-between items-center p-4 rounded-lg bg-[var(--color-accent)]/10"
                        >
                          <div>
                            <p className="font-semibold">Pedido #{order.id}</p>
                            <p className="text-sm text-[var(--color-text)]/60">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-[var(--color-text)]/60">{order.status}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Ver todos los pedidos</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="account">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Detalles de la Cuenta</CardTitle>
                    <CardDescription>Actualiza tu información personal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" defaultValue={session?.user?.name || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" defaultValue={session?.user?.email || ''} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Guardar Cambios</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Configuración de la Cuenta</CardTitle>
                    <CardDescription>Gestiona las preferencias de tu cuenta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing">Recibir correos de marketing</Label>
                      <Input type="checkbox" id="marketing" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Notificaciones push</Label>
                      <Input type="checkbox" id="notifications" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Guardar Preferencias</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

