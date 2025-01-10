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
import useCartStore from '@/utils/store/cartStore'
// Ajusta la ruta según sea necesario
const Product = [
  { id: 1, name: 'Producto 1', price: 10.99, imageUrl: '/placeholder.svg' },
  { id: 2, name: 'Producto 2', price: 12.99, imageUrl: '/placeholder.svg' },
  { id: 3, name: 'Producto 3', price: 8.99, imageUrl: '/placeholder.svg' },
  { id: 4, name: 'Producto 4', price: 15.99, imageUrl: '/placeholder.svg' },
]

export default function CartPage() {
  const { items, addItem, removeItem } = useCartStore()

  const updateQuantity = (id: number, change: number) => {
    const item = items.find(item => item.id === id)
    if (item) {
      addItem({ ...item, quantity: item.quantity + change })
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos en el carrito */}
          <div className="lg:col-span-2">
            <Card className="glass-card mb-6">
              <CardContent className="p-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
                    <div className="flex-shrink-0 w-24 h-24 mr-4">
                      <Image
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       src={item.imageUrl } alt={item.name} width={96} height={96} className="rounded-md" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-black">{item.name}</h3>
                      <p className="text-black/80">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, -1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2 text-black">{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="ml-4" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-black">
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
                <h2 className="text-xl font-semibold mb-4 text-black">Resumen del Pedido</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-black/80">Subtotal</span>
                    <span className="text-black">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/80">Envío</span>
                    <span className="text-black">${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span className="text-black">Total</span>
                    <span className="text-black">${total.toFixed(2)}</span>
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
          <h2 className="text-2xl font-bold mb-6 text-black">Productos Recomendados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Product.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card h-full flex flex-col">
                  <CardContent className="p-4 flex-grow">
                    <div className="relative w-full h-40 mb-4">
                      <Image
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       src={product.imageUrl} alt={product.name} fill className="object-cover rounded-md" />
                    </div>
                    <h3 className="text-sm font-semibold mb-2 text-black">{product.name}</h3>
                    <p className="text-black/80">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button variant="outline" className="w-full" onClick={() => addItem({ ...product, quantity: 1 })}>
                      Agregar al Carrito
                    </Button>
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
