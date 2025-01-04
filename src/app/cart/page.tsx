'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Footer } from '@/components/components/footer'
import { Navbar } from '@/components/components/navbar'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*
//este compoente traera y renderizara la informacion del zustand
// tendra una animacion especial al momento de renderizar
//tendra un opening distinto 
/*************************************************************************************************************************** */
// Datos dummy para los productos en el carrito
const cartItems = [
  { id: 1, name: 'Vela Aromática de Lavanda', price: 19.99, quantity: 2, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Difusor de Aceites Esenciales', price: 34.99, quantity: 1, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Set de Velas de Soja', price: 29.99, quantity: 3, image: '/placeholder.svg?height=200&width=200' },
]

// Datos dummy para productos recomendados
const recommendedProducts = [
  { id: 4, name: 'Vela de Vainilla', price: 14.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 5, name: 'Aceite Esencial de Eucalipto', price: 9.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 6, name: 'Vela de Masaje', price: 24.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 7, name: 'Difusor Ultrasónico', price: 39.99, image: '/placeholder.svg?height=200&width=200' },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-[var(--color-text)]">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos en el carrito */}
          <div className="lg:col-span-2">
            <Card className="glass-card mb-6">
              <CardContent className="p-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
                    <div className="flex-shrink-0 w-24 h-24 mr-4">
                      <Image src={item.image} alt={item.name} width={96} height={96} className="rounded-md" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">{item.name}</h3>
                      <p className="text-[var(--color-text)]/80">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, -1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2 text-[var(--color-text)]">{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="ml-4" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[var(--color-text)]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-[var(--color-text)]">Resumen del Pedido</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text)]/80">Subtotal</span>
                    <span className="text-[var(--color-text)]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text)]/80">Envío</span>
                    <span className="text-[var(--color-text)]">${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span className="text-[var(--color-text)]">Total</span>
                    <span className="text-[var(--color-text)]">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]">
                  Proceder al Pago
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Productos recomendados */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]">Productos Recomendados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card h-full flex flex-col">
                  <CardContent className="p-4 flex-grow">
                    <div className="relative w-full h-40 mb-4">
                      <Image src={product.image} alt={product.name} fill className="object-cover rounded-md" />
                    </div>
                    <h3 className="text-sm font-semibold mb-2 text-[var(--color-text)]">{product.name}</h3>
                    <p className="text-[var(--color-text)]/80">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button variant="outline" className="w-full">Agregar al Carrito</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

