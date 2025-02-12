'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, User } from 'lucide-react'
import { Footer } from '@/components/components/footer'
import { Navbar } from '@/components/components/navbar'

const recentOrders = [
  { id: '1', date: '2023-05-15', total: 59.99, status: 'Entregado' },
  { id: '2', date: '2023-06-02', total: 89.99, status: 'En camino' },
  { id: '3', date: '2023-06-20', total: 39.99, status: 'Procesando' },
]

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: session?.user?.name?.split(' ')[0] || '',
    lastName: session?.user?.name?.split(' ')[1] || '',
    email: session?.user?.email || '',
    phone: '',
    address: ''
  })

  if (status === 'loading') {
    return <div>Cargando...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/auth')
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:45623/api/usuarios/cliente/${session?.user?.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Error al actualizar los datos')
      }

      alert('Datos actualizados correctamente')
    } catch (error) {
      console.error(error)
      alert('Hubo un error al actualizar los datos')
    }
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
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{session?.user?.name}</h2>
              <p className="text-[var(--color-text)]/80">{session?.user?.email}</p>
            </CardContent>
          </Card>

          {/* Pestañas de contenido */}
          <div className="md:col-span-2">
            <Tabs defaultValue="account">
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="account">
                  <User className="w-4 h-4 mr-2" />
                  Cuenta
                </TabsTrigger>
                <TabsTrigger value="orders">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Pedidos
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
                    <CardTitle className="text-black">Detalles de la Cuenta</CardTitle>
                    <CardDescription className="text-black">Actualiza tu información personal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-black">Nombre</Label>
                      <Input id="firstName" value={formData.firstName} onChange={handleChange} className="text-black" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-black">Apellido</Label>
                      <Input id="lastName" value={formData.lastName} onChange={handleChange} className="text-black" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-black">Correo Electrónico</Label>
                      <Input id="email" disabled value={formData.email} className="text-black" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-black">Número de Teléfono</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} className="text-black" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-black">Dirección</Label>
                      <Input id="address" value={formData.address} onChange={handleChange} className="text-black" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-black">Contraseña</Label>
                      <Input id="password" type="password" disabled className="text-black" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleSubmit}>Guardar Cambios</Button>
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
