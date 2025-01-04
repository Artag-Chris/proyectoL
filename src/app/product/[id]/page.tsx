'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Footer } from '@/components/components/footer'
import { Navbar } from '@/components/components/navbar'
import { product, relatedProducts } from '@/utils/dummy/dummy'

/********************************************************************************************************************************
se cambiara  los colores de la pagina y se le agregara un efecto de blur al card
se colocara animacion de entrada para que se vea mas llamativo y mejore la exp de usuario
se implementara la funcionalidad de agregar al carrito y de compartir el producto 
se implementara zustand
se cambiara el color a la typografia
///////////////////////////////////////////////////////////////////////////////////////// ********************************/



export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Imagen del producto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Información del producto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold mb-4 text-[var(--color-text)]">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6 text-[var(--color-primary)]">${product.price.toFixed(2)}</p>
              <p className="text-[var(--color-text)]/80 mb-8">{product.description}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-xl font-semibold text-[var(--color-text)]">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Añadir al carrito
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Productos relacionados */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden backdrop-blur-md bg-white/10 border-none">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--color-text)]">{product.name}</h3>
                    <p className="text-[var(--color-primary)] font-semibold">${product.price.toFixed(2)}</p>
                  </CardContent>
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

